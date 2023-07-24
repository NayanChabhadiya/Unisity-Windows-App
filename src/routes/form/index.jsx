import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../store/ApiSlice/studentSlice";
import { Toaster, toast } from "react-hot-toast";
import {
  getAccounts,
  getAccountsById,
} from "../../store/ApiSlice/accountSlice";
import { useNavigate } from "react-router-dom";
import { setButtonType } from "../../store/ApiSlice/buttonSlice";
import { createFaculty } from "../../store/ApiSlice/facultySlice";

const Form = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { buttonType } = useSelector((state) => state.buttons);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    if (buttonType === "student") {
      handleAddStudent(values);
    }
    if (buttonType === "faculty") {
      handleAddFaculty(values);
    }
  };

  const handleAddStudent = (values) => {
    const data = {
      ...values,
      roleId: "648f4f478d6406402a675667",
      organizationId: user.id,
    };
    dispatch(createStudent(data)).then((res) => {
      if (res.payload.data.success) {
        toast.success("Student Added Successfully");
        if (user?.role === "Admin") {
          dispatch(getAccounts());
        } else {
          dispatch(getAccountsById(user?.id));
        }
        dispatch(setButtonType(""));
        nav("/students");
      }
    });
  };

  const handleAddFaculty = (values) => {
    const data = {
      ...values,
      roleId: "648f4f178d6406402a675666",
      organizationId: user.id,
    };
    dispatch(createFaculty(data)).then((res) => {
      if (res.payload.data.success) {
        toast.success("Faculty Added Successfully");
        if (user?.role === "Admin") {
          dispatch(getAccounts());
        } else {
          dispatch(getAccountsById(user?.id));
        }
        dispatch(setButtonType(""));
        nav("/faculties");
      }
    });
  };

  return (
    <Box m="20px">
      <Toaster />
      <Header
        title={
          buttonType === "encharge"
            ? "Create Encharge"
            : buttonType === "student"
            ? "Create Student"
            : buttonType === "faculty" && "Create Faculty"
        }
        subtitle="Create a New Profile"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                size="small"
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                size="small"
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                size="small"
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                size="small"
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressLine}
                size="small"
                name="addressLine"
                error={!!touched.addressLine && !!errors.addressLine}
                helperText={touched.addressLine && errors.addressLine}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                // label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                size="small"
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                size="small"
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                size="small"
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 4" }}
              />{" "}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                size="small"
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 4" }}
              />{" "}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                size="small"
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                size="small"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passwordHash}
                name="passwordHash"
                error={!!touched.passwordHash && !!errors.passwordHash}
                helperText={touched.passwordHash && errors.passwordHash}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" mb="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  addressLine: yup.string().required("required"),
  dob: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  addressLine: "",
  dob: "",
};

export default Form;
