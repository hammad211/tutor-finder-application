import React, { useState, useEffect, useRef } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Button, Form, Row, Col, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { findUser, resetPassword, otpReset } from "../../calls/auth/service";
import { toast } from "react-toastify";
import "./user.css";
import {
  faEnvelope,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const { role } = useParams();
  const [roles, setRoles] = useState(role);
  const navigate = useNavigate();
  const [userExist, setUserExist] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );
  const [token, setToken] = useState("");
  const [handleShow, setHandleShow] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setRoles(role);
  }, [role]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < refs.current.length - 1 && value !== "") {
      if (refs.current[index + 1]?.current) {
        refs.current[index + 1].current.focus();
      }
    }
  };

  const handleValidate = () => {
    const otpValue = otp.join("");
    setLoader(true);
    otpReset(email, roles, otpValue, token)
      .then((res) => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_LEFT,
        });
        setUserExist(true);
        console.log("dd");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  const findUsers = () => {
    setLoader(true);
    findUser(email, roles)
      .then((res) => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_LEFT,
        });
        setHandleShow(true);
        setRoles(res.role);
        setEmail(res.email);
        setToken(res.token);
        setLoader(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const reset = () => {
    resetPassword(email, roles, password)
      .then((res) => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_LEFT,
        });
        navigate(`/authPage/login/${roles}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      const isEmailFilled = email.trim() !== "";
      const isRoleFilled = roles.trim() !== "";

      if (isEmailFilled && isRoleFilled) {
        if (userExist === false) {
          findUsers();
        } else if (userExist === true) {
          reset();
        }
      } else {
        alert("Please fill in all fields before submitting.");
      }
    } else {
      // If the form is not valid, display an error message or handle it accordingly
      // For example:
      alert("Please fill in all fields correctly before submitting.");
    }
  };

  const [timer, setTimer] = useState(1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer === 0) {
        clearInterval(intervalId);
        alert("Time Expire. Try Again");
        navigate(`/authPage/login/${roles}`);
      } else {
        setTimer((prevTimer) => prevTimer - 1); // Decrement the timer
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup function to clear interval on unmount
  }, [timer, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTimerDisplay = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="contSignUp mdcntSgnUp mdcntSgnUp3">
      {/* <div className="contSignUp"> */}

      {handleShow ? (
        userExist === false ? (
          <div className="container height-100 mt-3 d-flex justify-content-center align-items-center bg mdQuPlsOne3">
            <div className="card p-5 text-center">
              <h6
                style={{
                  fontFamily: "Georgia, serif",
                  position: "relative",
                  bottom: "18px",
                }}
              >
                Please enter the one-time password to verify your account
              </h6>
              <div>
                <span>A code has been sent to</span>
                <small>*******9897</small>
              </div>
              <div
                id="otp"
                className="inputs d-flex flex-row justify-content-center mt-2"
              >
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={refs.current[index]}
                    className="m-2 text-center form-control border-black rounded"
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <div className="mt-4">
                <Button
                  // className="btn btn-primary px-4 validate"
                  // className="sgnUpBtnVal"
                  className="adMrBtnUsrLs2"
                  onClick={handleValidate}
                >
                  <span>Validate</span>
                </Button>
              </div>
              <div className="content d-flex justify-content-center align-items-center mt-5">
                <span style={{ marginTop: "10px" }}>
                  {" "}
                  Code Will Expire in {handleTimerDisplay()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="container height-100 d-flex justify-content-center align-items-center bg mdQuChgPasPnk3"
            style={{ marginTop: "40px" }}
          >
            <div className="card text-center w-75 mdQuChgWht3">
              <h6
                style={{
                  fontFamily: "Georgia, serif",
                  position: "relative",
                  bottom: "16px",
                }}
              >
                Enter your New password{" "}
              </h6>
              <div
                id="otp"
                className="inputs d-flex flex-row justify-content-center "
              >
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  className="glassmorphism-form"
                  style={{ marginTop: "30px" }}
                >
                  <Row>
                    <Col xs={5} md={4}>
                      <div className="col-11 ms-5 mdQupasConfpas mdQupasConfpas3">
                        <Form.Group
                          controlId="validationCustomPassword"
                          style={{ width: "380px" }}
                          className="frgtUndrPswrd1"
                        >
                          <Form.Label
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            Password
                          </Form.Label>
                          <InputGroup hasValidation>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="signPlaceColor form-control"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                if (e.target.value.length < 6) {
                                  setPasswordError(
                                    "Password must be at least 6 characters long."
                                  );
                                } else {
                                  setPasswordError("");
                                }
                              }}
                              isInvalid={
                                validated && (!password || passwordError)
                              }
                            />
                            <InputGroup.Text onClick={togglePasswordVisibility}>
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                              />
                            </InputGroup.Text>
                            <Form.Control.Feedback
                              type="invalid"
                              style={{ marginLeft: "-1px" }}
                            >
                              {passwordError ||
                                "Please provide a valid password."}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group
                          controlId="validationCustomConfirmPassword"
                          style={{ marginTop: "30px", width: "380px" }}
                          className="frgtUndrPswrd2"
                        >
                          <Form.Label
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            Confirm Password
                          </Form.Label>
                          <InputGroup hasValidation>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              className="signPlaceColor form-control"
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (e.target.value !== password) {
                                  setConfirmPasswordError(
                                    "Passwords do not match"
                                  );
                                } else {
                                  setConfirmPasswordError("");
                                }
                              }}
                              isInvalid={
                                validated &&
                                (!confirmPassword || confirmPasswordError)
                              }
                            />
                            <InputGroup.Text onClick={togglePasswordVisibility}>
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                              />
                            </InputGroup.Text>
                            <Form.Control.Feedback
                              type="invalid"
                              style={{ marginLeft: "-1px" }}
                            >
                              {confirmPasswordError ||
                                "Please confirm your password."}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </div>
                    </Col>
                    <Button
                      className="btn w-50  validate adMrBtnUsrLs3 mdQuSgnChngBtn mdQuSgnChngBtn3"
                      // className="sgnUpBtnChng"
                      type="submit"
                      style={{ marginTop: "40px", marginLeft: "70px" }}
                    >
                      <span>Change Password</span>
                    </Button>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        )
      ) : (
        <>
          <div className="left-side mdQuSgnULfSd mdQuSgnULfSd3">
            <h2 style={{ fontFamily: "Georgia, serif" }}>Welcome Back!</h2>
            <p style={{ textAlign: "center", padding: "20px" }}>
              To keep connected with us please Sign up with your personal info
            </p>
            <Button
              type="button"
              className="sgnInBtn"
              onClick={() => navigate(`/authPage/login/${roles}`)}
            >
              SIGN In
            </Button>
          </div>

          <div className="right-side">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="glassmorphism-form"
            >
              <Row className="background">
                <Col xs={5} md={4}>
                  <div
                    className="col-11 ms-5 mdQuSgnURtSd mdQuSgnURtSd3"
                    style={{ marginTop: "120px" }}
                  >
                    <h3
                      className="ms-3 px-5 fw-bold mt-7 signH3"
                      style={{ left: "30px" }}
                    >
                      Forget Password
                    </h3>
                    <Form.Group
                      controlId="validationCustomEmail"
                      style={{ marginTop: "67px" }}
                    >
                      <Form.Label>Email</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="email"
                          placeholder="Email"
                          className="signPlaceColor form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          isInvalid={validated && !email}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ marginTop: "35px", marginLeft: "18px" }}
                        >
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      controlId="validationCustomRole"
                      style={{ marginTop: "30px" }}
                    >
                      <Form.Label>Role</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text style={{ height: "38px" }}>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroup.Text>
                        <Form.Select
                          value={roles}
                          onChange={handleRoleChange}
                          className="signPlaceColor"
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                        </Form.Select>
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ marginLeft: "18px" }}
                        >
                          Please select a role.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {loader === true ? (
                      <div style={{ marginLeft: "160px", marginTop: "40px" }}>
                        <Loader />
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        className="adMrBtnUsrLs mdQuSgnUpbt3"
                      >
                        {/* classname="sgnUpBtn2" */}
                        <span>Find Account</span>
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )}
    </div>

    // </div>
  );
};

export default Login;
