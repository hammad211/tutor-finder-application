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
import { useNavigate } from "react-router-dom";
import { postPersonal, updatePersonal } from "../../calls/student/studentInfo";
import {
  postPersonalTutor,
  updatePersonalTutor,
} from "../../calls/tutor/tutorPersonal";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import { Button } from "react-bootstrap";
import { UseUserInfos } from "../../context/userInfo";

// dashboard.css

const AddressForms = ({ profile, getData }) => {
  const navigate = useNavigate();
  console.log(getData);
  const [area, setArea] = useState("");
  const {userValue, userInfo, userTime, userImage } = UseUserInfos();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (userValue === "false" && userTime === "true") {
        toast.error('Admin disapprove, please provide valid data', {
          position: "top-left"
        });
      }
      hasRun.current = true; // Set the ref to true after the effect has run
    }
  }, []);
  

  const [getCoordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleSubmit = async (values) => {
    try {
      let response;
      if (profile === "Student Profile Edit" && getData) {
        response = await updatePersonal(
          values.firstName,
          values.lastName,
          values.address,
          values.city,
          values.gender,
          values.number,
          getCoordinates
        );
        navigate("/");
      } else if (profile === "Teacher Profile Edit" && getData) {
        response = await updatePersonalTutor(
          values.firstName,
          values.lastName,
          values.address,
          values.city,
          values.gender,
          values.number,
          values.subject,
          values.price,
          values.about,
          getCoordinates
        );
        navigate("/teachers/teacherDashboard");
      } else if (profile === "Student Profile" && !getData) {
        response = await postPersonal(
          values.firstName,
          values.lastName,
          values.address,
          values.city,
          values.gender,
          values.number,
          getCoordinates
        );
        navigate("/image");
      } else if (profile === "Teachers Profile" && !getData) {
        response = await postPersonalTutor(
          values.firstName,
          values.lastName,
          values.address,
          values.city,
          values.gender,
          values.number,
          values.subject,
          values.price,
          values.about,
          getCoordinates
        );
        navigate("/teachers/teacherScreen");
      }

      if (response) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } catch (error) {
      toast.error(`Error: An error occurred. Please try again later.`, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      number: "",
      address: "",
      city: "",
      country: "Pakistan",
      subject: selectedSubjects,
      price: "",
      about: "",
      coordinates: getCoordinates,
    },

    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "First name is required";
      }

      if (!values.lastName) {
        errors.lastName = "Last name is required";
      }

      if (!values.address) {
        errors.address = "Address is required";
      }

      if (!values.city) {
        errors.city = "City is required";
      }

      if (values.number.length !== 11) {
        errors.number = "Phone Number is required in digit";
      }

      if (!values.gender) {
        errors.gender = "Gender is required";
      }

      if (
        profile === "Teachers Profile" ||
        profile === "Teacher Profile Edit"
      ) {
        if (!values.subject) {
          errors.subject = "Subject is required";
        }
        if (!values.price) {
          errors.price = "Price is required";
        }
        if (!values.about) {
          errors.about = "Required";
        } else {
          const wordCount = values.about.split(/\s+/).length;
          if (wordCount < 30) {
            errors.about = "Minimum 30 words required";
          }
        }
      }
      return errors;
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getCurrentPosition();
        const addressData = await reverseGeocode(
          position.coords.latitude,
          position.coords.longitude
        );
        const cityName = extractCityName(addressData);
        setArea(cityName);
        formik.setFieldValue("city", cityName);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const reverseGeocode = async (latitude, longitude) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18`
    );
    console.log(response);
    setCoordinates({
      longitude: response.data.lon,
      latitude: response.data.lat,
    });

    return response.data;
  };

  const extractCityName = (addressData) => {
    return (
      addressData?.address?.city ||
      addressData?.address?.town ||
      addressData?.address?.village ||
      ""
    );
  };

  const handleNumberInput = (event) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    const formattedValue =
      rawValue.length < 11 ? rawValue : rawValue.slice(-11);
    formik.setFieldValue("number", formattedValue);
  };

  useEffect(() => {
    if (profile === "Student Profile Edit") {
      formik.setValues({
        firstName: getData[0]?.s_fname || "",
        lastName: getData[0]?.s_lname || "",
        gender: getData[0]?.s_address || "",
        number: getData[0]?.s_number || "",
        address: getData[0]?.s_gender || "",
        city: getData[0]?.s_city || "",
        country: "Pakistan",
        coordinates: getCoordinates,
      });
    } else if (profile === "Teacher Profile Edit") {
      formik.setValues({
        firstName: getData[0]?.t_name || "",
        lastName: getData[0]?.t_lname || "",
        gender: getData[0]?.t_gender || "",
        number: getData[0]?.number || "",
        address: getData[0]?.t_address || "",
        city: getData[0]?.t_city || "",
        country: "Pakistan",
        coordinates: getCoordinates,
        subject: getData[0]?.subject,
        price: getData[0]?.price,
        about: getData[0]?.about,
      });
    }
  }, [getData, profile, getCoordinates]);

  useEffect(() => {
    if (profile === "Teacher Profile Edit" && getData) {
      const subjectString = getData[0]?.subject;
      if (subjectString) {
        const subjectArray = subjectString.replace(/[{}"]/g, "").split(",");
        setSelectedSubjects(subjectArray);
      } else {
        setSelectedSubjects([]);
      }
    }
  }, [getData, profile]);

  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animBtn");
        } else {
          entry.target.classList.remove("animBtn");
        }
      });
    });

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white w-100">
      <div className="top-ml">
        <br />
        <br />
        <br />
        <br />
        {/* <h1 className="ms-5 mt-5 text-secondary font-weight-bold SubfrmH1">
          {profile}
        </h1>
        <h3 className="ms-5 dashH1"> Dashboard/Profile </h3> */}
      </div>

      <Container maxWidth="lg" className="mainC">
        <div className="border border-secondary mainC1">
          <Typography
            variant="h4"
            className="proInfStd"
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "50px",
              marginTop: "20px",
            }}
            gutterBottom
          >
            Profile Information
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={8} sm={6} className="frstNmAni">
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  {...formik.getFieldProps("firstName")}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
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
              <Grid item xs={12} sm={6} className="frstNmAni">
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  {...formik.getFieldProps("lastName")}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
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
              <Grid item xs={12} sm={6} className="frstNmAni">
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="outlined"
                  {...formik.getFieldProps("address")}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
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

              <Grid item xs={12} sm={6} className="frstNmAni">
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="outlined"
                  {...formik.getFieldProps("city")}
                  error={formik.touched.city && Boolean(formik.errors.city)}
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

              <Grid item xs={12} sm={6} className="frstNmAni">
                <TextField
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    style: {
                      fontFamily: "Georgia, serif",
                    },
                  }}
                  {...formik.getFieldProps("country")}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Georgia, serif",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} className="frstNmAni">
                <FormControl variant="outlined">
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Gender
                    {formik.errors.gender && formik.touched.gender && (
                      <span className="text-danger">*</span>
                    )}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    label="Gender"
                    name="gender"
                    style={{ fontFamily: "Georgia, serif" }}
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={
                      formik.touched.gender ? (
                        formik.errors.gender ? (
                          formik.errors.gender
                        ) : (
                          <span className="text-danger">*</span>
                        )
                      ) : (
                        ""
                      )
                    }
                  >
                    <MenuItem value="" style={{ fontFamily: "Georgia, serif" }}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem
                      value={"Male"}
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Male
                    </MenuItem>
                    <MenuItem
                      value={"Female"}
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Female
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} className="frstNmAni">
                <TextField
                  required
                  id="number"
                  name="number"
                  label="Phone Number"
                  fullWidth
                  autoComplete="shipping country"
                  variant="outlined"
                  {...formik.getFieldProps("number")}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleNumberInput(e);
                  }}
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  helperText={
                    formik.touched.number && formik.errors.number
                      ? formik.errors.number
                      : "Must be a number of 11 digits"
                  }
                  FormHelperTextProps={{
                    style: { fontFamily: "Georgia, serif" },
                  }}
                  inputProps={{
                    maxLength: 11,
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

              {(profile === "Teachers Profile" ||
                profile === "Teacher Profile Edit") && (
                <>
                  <Grid item xs={12} sm={6} className="frstNmAni">
                    <FormControl
                      variant="outlined"
                      error={
                        formik.touched.subject && Boolean(formik.errors.subject)
                      }
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Subject
                        {formik.errors.subject && formik.touched.subject && (
                          <span className="text-danger">*</span>
                        )}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        multiple
                        value={selectedSubjects}
                        onChange={(event) => {
                          formik.handleChange(event);
                          setSelectedSubjects(event.target.value);
                        }}
                        label="Subject"
                        name="subject"
                        style={{ fontFamily: "Georgia, serif" }}
                        error={
                          formik.touched.subject &&
                          Boolean(formik.errors.subject)
                        }
                        renderValue={(selected) => (
                          <div>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </div>
                        )}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 250,
                            },
                          },
                        }}
                      >
                        <MenuItem
                          value={"English"}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          English
                        </MenuItem>
                        <MenuItem
                          value={"Urdu"}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          Urdu
                        </MenuItem>
                        <MenuItem
                          value={"Maths"}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          Maths
                        </MenuItem>
                        <MenuItem
                          value={"Science"}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          Science
                        </MenuItem>
                        <MenuItem
                          value={"Islamiyat"}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          Islamiyat
                        </MenuItem>
                        <MenuItem
                          value={"History"}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          History
                        </MenuItem>
                      </Select>
                      {formik.touched.subject && formik.errors.subject && (
                        <FormHelperText className="text-danger">
                          {formik.errors.subject}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} className="frstNmAni">
                    <TextField
                      required
                      id="price"
                      name="price"
                      label="Price"
                      fullWidth
                      autoComplete="shipping address-level2"
                      variant="outlined"
                      {...formik.getFieldProps("price")}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
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

                  <Grid item xs={12} sm={12} className="frstNmAni">
                    <TextField
                      required
                      id="about"
                      name="about"
                      label="About"
                      placeholder="Tell About Your Self"
                      fullWidth
                      multiline
                      variant="outlined"
                      autoComplete="shipping address-level2"
                      {...formik.getFieldProps("about")}
                      error={
                        formik.touched.about && Boolean(formik.errors.about)
                      }
                      helperText={formik.touched.about && formik.errors.about}
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
                </>
              )}

              <Grid
                item
                xs={12}
                sm={11}
                className="ms-5 h-50 rounded mt-3 d-flex justify-content-center "
                style={{ fontFamily: "Georgia, serif" }}
              >
                <Button
                  className="proInfStdSbmt text-white rounder p-2 w-25 adMrBtn mdQuadBtn3"
                  type="submit"
                  ref={buttonRef}
                >
                  <span>Submit</span>
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <br />
      </Container>
    </div>
  );
};

export default AddressForms;
