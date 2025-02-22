/* eslint-disable no-unsafe-optional-chaining */
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "Student",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Name must be at least 5 characters long")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      role: Yup.string().required("Please specify who you are"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          values
        );
        if (response) {
          toast.success(response?.data?.message);
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed To Signup!");
      }
    },
  });

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.default"
        marginTop={5}
        flexDirection={"column"}
      >
        <Typography variant="h4" sx={{ p: 5, fontWeight: "bold" }}>
          {" "}
          School Class Scheduler
        </Typography>
        <Card sx={{ maxWidth: 400, width: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                placeholder="Please Enter your Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                placeholder="Please Enter your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <FormControl component="fieldset" margin="normal" fullWidth>
                <FormLabel component="legend">Who you are?</FormLabel>
                <RadioGroup
                  sx={{ display: "flex", flexDirection: "row" }}
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="Teacher"
                    control={<Radio />}
                    label="Teacher"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                name="password"
                placeholder="Please Enter Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Sign Up
              </Button>
              <div style={{ textAlign: "center" }}>
                Already have an account? Please{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Login
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SignUp;
