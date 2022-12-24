import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect, useContext } from "react";

import axios from "../../utils/axiosInstance";

import EmployeeForm from "../../components/dashboard/EmployeeForm";
import EmployeeAllSP from "../../components/dashboard/EmployeeAllSP";
import { ContextProvider } from "../../Context";

function EditEmployee() {
  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [sps, setSps] = useState([]);

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
        await axios({
          method: "POST",
          url: "/v1/api/employee/update",
          data: {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
            ...values,
          },
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
      const { data } = await axios({
        method: "POST",
        url: `/v1/api/employee/getOne`,
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          employee_contact: id,
        },
      });

      setValues(data.data);
      toast.success("Details fetched successfully");
    } catch (error) {
      toast.error("Error fetching details");
      console.log(error);
    }
  };

  const getAllSPs = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/v1/api/sp/spbyemployee",
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          employee_contact: id,
        },
      });

      console.log(data.data);

      setSps(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
    getAllSPs();
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

        {sps.length > 0 && <EmployeeAllSP sps={sps} />}
      </Container>
    </Page>
  );
}

export default EditEmployee;
