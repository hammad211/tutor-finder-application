import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Buttons from "../Button/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageComponent from "../Image/image";
import {
  postQualification,
  updateQualification,
} from "../../calls/tutor/tutorQualification";
import { UseUserInfos } from "../../context/userInfo";
import { Button } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const QualificationProfile = ({ profile, isUpdating, data }) => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState("");
  const {  userQualify ,userTime } = UseUserInfos();
  const hasRun = useRef(false);

  
  useEffect(() => {
    if (!hasRun.current) {
      if (userQualify === "false" && userTime === "true") {
        toast.error('Qualification should be authentic', {
          position: "top-left"
        });
      }
      hasRun.current = true; // Set the ref to true after the effect has run
    }
  }, []);

  useEffect(() => {
    if (isUpdating) {
      setImageData(data.image);
    }
  }, []);

  const initialValues = {
    degreeName: isUpdating ? data.t_degree || "" : "",
    degreeType: isUpdating ? data.t_degreetype || "" : "",
    institute: isUpdating ? data.t_institute || "" : "",
    city: isUpdating ? data.city || "" : "",
    startYear: isUpdating ? data.t_degreeyear || "" : "",
    endYear: isUpdating ? data.year_end || "" : "",
    image: isUpdating ? data.image || "" : "",
  };

  const handleImageUpload = async (base64String) => {
    try {
      const image64 = await convertImageToBase64(base64String);
      formik.setValues({ ...formik.values, image: image64 });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const formSubmitFn = async (values) => {
    try {
      if (isUpdating) {
        const res = await updateQualification(
          values.degreeName,
          values.degreeType,
          values.institute,
          values.city,
          values.startYear,
          values.endYear,
          data.id,
          values.image
        );
        return res;
      } else {
        const res = await postQualification(
          values.degreeName,
          values.degreeType,
          values.institute,
          values.city,
          values.startYear,
          values.endYear,
          values.image
        );
        return res;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};

      if (!values.degreeName) {
        errors.degreeName = "Degree name is required";
      }

      if (!values.degreeType) {
        errors.degreeType = "Degree type is required";
      }

      if (!values.institute) {
        errors.institute = "Institute Name is required";
      }

      if (!values.city) {
        errors.city = "City is required";
      }

      if (!values.startYear) {
        errors.startYear = "year is required";
      }
      if (!values.endYear) {
        errors.endYear = "year is required";
      }
      if (values.startYear === values.endYear) {
        errors.startYear = "Starting and ending years cannot be the same";
        errors.endYear = "Starting and ending years cannot be the same";
      }
      if (values.startYear > values.endYear) {
        errors.startYear =
          "Starting year cannot be the greater than Ending year";
        errors.endYear = "Starting year cannot be the greater than Ending year";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        console.log(values);
        if (values.image === "") {
          alert("Upload Image");
          return false;
        }
        const res = await formSubmitFn(values);
        toast.success(res.message, {
          position: toast.POSITION.TOP_LEFT,
        });

        navigate("/teachers/teacherCompleteProfile");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(246, 100, 100)", // Yahan aap apni marzi ka color daal sakti hain
      },
    },
  });

  return (
    <div className="bg-white ">
      <div className="top-ml">
        <br />
        <br />

        {/* <h1 className="ms-5 text-secondary fs-2 font-weight-bold">{profile} Information</h1> */}
      </div>

      <Container maxWidth="lg" className="mainC ">
        <div className="border border-secondary mainC1 w-100">
          {/* <div className="qualBrdrClr mainC1 w-100"> */}
          <Typography
            variant="h4"
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "50px",
              marginTop: "20px",
            }}
            gutterBottom
          >
            Add Your Highest Qualification
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <ThemeProvider theme={theme}>
                <Grid item xs={8} sm={6}>
                  <TextField
                    required
                    id="degreeName"
                    name="degreeName"
                    label="Degree Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    {...formik.getFieldProps("degreeName")}
                    error={
                      formik.touched.degreeName && formik.errors.degreeName
                    }
                    helperText={
                      formik.touched.degreeName && formik.errors.degreeName
                    }
                    InputProps={{
                      style: {
                        fontFamily: "Georgia, serif",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: "Georgia, serif",
                      },
                    }}
                  />
                </Grid>
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="standard">
                    <InputLabel
                      id="degreeType-label"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Degree Type
                    </InputLabel>
                    <Select
                      labelId="degreeType-label"
                      id="degreeType"
                      value={formik.values.degreeType}
                      onChange={formik.handleChange}
                      name="degreeType"
                      style={{ fontFamily: "Georgia, serif" }}
                      error={
                        formik.touched.degreeType && formik.errors.degreeType
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Matric"}>Matric</MenuItem>
                      <MenuItem value={"Intermediate"}>Intermediate</MenuItem>

                      <MenuItem value={"Bachelors"}>Bachelors</MenuItem>
                      <MenuItem value={"Masters"}>Masters</MenuItem>
                      <MenuItem value={"PHD"}>PHD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="institute"
                    name="institute"
                    label="Institute"
                    placeholder="Enter Institute"
                    fullWidth
                    variant="standard"
                    {...formik.getFieldProps("institute")}
                    error={formik.touched.institute && formik.errors.institute}
                    helperText={
                      formik.touched.institute && formik.errors.institute
                    }
                    InputProps={{
                      style: {
                        fontFamily: "Georgia, serif",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: "Georgia, serif",
                      },
                    }}
                  />
                </Grid>
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    variant="standard"
                    {...formik.getFieldProps("city")}
                    error={formik.touched.city && formik.errors.city}
                    helperText={formik.touched.city && formik.errors.city}
                    InputProps={{
                      style: {
                        fontFamily: "Georgia, serif",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: "Georgia, serif",
                      },
                    }}
                  />
                </Grid>
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel
                      id="startYear-label"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Starting Year
                    </InputLabel>
                    <Select
                      labelId="startYear-label"
                      id="startYear"
                      value={formik.values.startYear}
                      onChange={formik.handleChange}
                      name="startYear"
                      MenuProps={{
                        PaperProps: { style: { maxHeight: "200px" } },
                      }}
                    >
                      <MenuItem
                        value=""
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        <em>None</em>
                      </MenuItem>
                      {Array.from({ length: 65 }, (_, index) => {
                        const year = new Date().getFullYear() - index;
                        return (
                          <MenuItem
                            key={index}
                            value={year}
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {year}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {formik.touched.startYear && formik.errors.startYear && (
                      <Typography color="error" variant="inherit">
                        {formik.errors.startYear}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel
                      id="endYear-label"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Ending Year
                    </InputLabel>
                    <Select
                      labelId="endYear-label"
                      id="endYear"
                      value={formik.values.endYear}
                      onChange={formik.handleChange}
                      name="endYear"
                      MenuProps={{
                        PaperProps: { style: { maxHeight: "200px" } },
                      }}
                    >
                      <MenuItem
                        value=""
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        <em>None</em>
                      </MenuItem>
                      {Array.from({ length: 65 }, (_, index) => (
                        <MenuItem
                          key={index}
                          value={2024 - index}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {2024 - index}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.endYear && formik.errors.endYear && (
                      <Typography color="error" variant="inherit">
                        {formik.errors.endYear}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </ThemeProvider>

              <ImageComponent
                onImageUpload={handleImageUpload}
                value={false}
                valueImg={true}
                data={" Degree Image"}
                data1={imageData}
              />
              <Grid
                item
                xs={12}
                sm={11}
                className="ms-5 h-25 rounded mt-3 d-flex justify-content-center"
              >
                <Button
                  className="text-white rounder p-2 w-25 adMrBtnHm2 mdQuadBtn3"
                  type="submit"
                >
                  <span>Submit</span>
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <br></br>
      </Container>
      <br></br>
    </div>
  );
};

export default QualificationProfile;
