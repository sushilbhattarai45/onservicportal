import * as Yup from "yup";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, Checkbox, TextField, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import toast from "react-hot-toast";
import axios from "axios";

// user logged in or not
import { useContext } from "react";
import { ContextProvider } from "../../../Context";

export default function LoginForm() {
  const { login } = useContext(ContextProvider);
  const [, setUser] = login;

  const [userExists, setUserExists] = useState(false);
  const [otp, setOtp] = useState(null);
  const [loginUser, setLoginUser] = useState({});

  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Invalid phone number")
      .required("Phone number is required")
      .min(10, "Phone number must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    otp: Yup.string()
      .min(6, "OTP must be exactly 6 digits")
      .max(6, "OTP must be exactly 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      contact: "",
      otp: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      if (userExists) {
        handleLogin();
      } else {
        await sendOTP();
        return true;
      }
    },
  });

  const sendOTP = async () => {
    const contact = formik.values.contact;
    if (`${contact}`.length !== 10) {
      toast.error("Invalid Phone Number");
      return;
    }

    try {
      const { data } = await axios.post("v1/api/employee/login", {
        employee_contact: contact,
        portal: "MAIN",
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
      });

      if (data.statuscode === 404) {
        toast.error("User does not exist");
        setUserExists(false);
        return;
      }

      if (data.statuscode === 201) {
        setUserExists(true);

        const { employee_post, employee_status } = data.data;
        if (employee_post === "E2") {
          toast.error("You are not authorized to login");
          return;
        }

        if (employee_status === false) {
          toast.error("You are not authorized to access the dashboard.");
          return;
        }

        // save the user details
        setLoginUser(data.data);

        toast.success("OTP sent to your phone number");
        //save the otp
        setOtp(data.otp);
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = () => {
    const enteredOtp = formik.values.otp;

    if (enteredOtp === "" || enteredOtp.length !== 6) {
      toast.error("Invalid OTP");
      return;
    }

    if (enteredOtp == otp) {
      const user = {
        displayName: loginUser.employee_name,
        contact: loginUser.employee_contact,
        post: loginUser.employee_post,
        photoURL: `https://ui-avatars.com/api/?size=128&background=random&rounded=true&name=${loginUser.employee_name}`,
      };

      setUser(user);

      if (formik.values.remember) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Login Successful");
      navigate("/app", { replace: true });
    } else {
      console.log(enteredOtp, otp);
      toast.error("Invalid OTP");
    }
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="phone"
            type="number"
            label="Contact number"
            {...getFieldProps("contact")}
            error={Boolean(touched.contact && errors.contact)}
            helperText={touched.contact && errors.contact}
            disabled={userExists}
            required
          />

          {userExists && (
            <TextField
              fullWidth
              autoComplete="otp"
              type="text"
              label="OTP"
              {...getFieldProps("otp")}
              error={Boolean(touched.otp && errors.otp)}
              helperText={touched.otp && errors.otp}
              required
            />
          )}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
