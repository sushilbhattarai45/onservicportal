import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState } from "react";
import axios from "axios";
import EmployeeForm from "../../components/dashboard/EmployeeForm";

import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [values, setValues] = useState({
    employee_contact: "",
    employee_name: "",
    employee_status: true,
    employee_post: "",
    employee_limit: 10,
  });

  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    console.log("hi");
    setDisableButton(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!disableButton) {
      const toastId = toast.loading("Saving...");
      console.log(values);

      try {
        const { data } = await axios.post(`/v1/api/employee/post`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
        });

        setDisableButton(true);
        toast.success("Employee added successfully", {
          duration: 4000,
          position: "top-center",
        });

        // redirect to the edit page
        const { employee_contact } = data.employee;
        navigate(`/employees/edit/${employee_contact}`);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <Page title="Add new employee">
      <Container>
        <EmployeeForm
          values={values}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleInputChange={handleInputChange}
          buttonText="Save"
        />
      </Container>
    </Page>
  );
}

export default AddEmployee;
