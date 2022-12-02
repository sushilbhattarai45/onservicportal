import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "../../components/dashboard/EmployeeForm";

function EditEmployee() {
  const [values, setValues] = useState({
    employee_contact: "",
    employee_name: "",
    employee_status: true,
    employee_post: "",
  });

  const [disableButton, setDisableButton] = useState(true);

  const id = window.location.pathname.split("/")[3];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    setDisableButton(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!disableButton) {
      const toastId = toast.loading("Saving...");
      console.log(values);

      try {
        await axios.post(`/v1/api/employee/update`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
        });

        setDisableButton(true);
        toast.success("Employee updated successfully", {
          duration: 4000,
          position: "top-center",
        });

        await getEmployeeDetails();
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  const getEmployeeDetails = async () => {
    try {
      const { data } = await axios.post(`/v1/api/employee/getOne`, {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        employee_contact: id,
      });

      setValues(data.data);
      toast.success("Details fetched successfully");
    } catch (error) {
      toast.error("Error fetching details");
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  return (
    <Page title="Edit employee">
      <Container>
        <EmployeeForm
          values={values}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleInputChange={handleInputChange}
          buttonText="Update"
        />
      </Container>
    </Page>
  );
}

export default EditEmployee;
