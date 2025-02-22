/* eslint-disable no-unsafe-optional-chaining */
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../Redux/authSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
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
          "http://localhost:5000/api/auth/login",
          values
        );
        const { token, user } = response?.data;
        if (response) {
          dispatch(loginSuccess({ token, user }));
          toast.success(response?.data?.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 4000);
        } else {
          toast.error(response?.data?.message || "Login Failed");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to Login!");
      }
    },
  });

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={5}
        bgcolor="background.default"
        flexDirection={"column"}
      >
        <Typography variant="h4" sx={{ p: 5, fontWeight: "bold" }}>
          {" "}
          School Class Scheduler
        </Typography>
        <Card sx={{ maxWidth: 400, width: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                name="password"
                placeholder="Please Enter your password"
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
                Login
              </Button>
              <div style={{ textAlign: "center" }}>
                Don&apos;t have an account? Please{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  SignUp
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

export default Login;
