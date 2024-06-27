import React, { useState, useEffect } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../calls/auth/service";
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
import { Link, useParams } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const { role } = useParams();
  const [roles, setRoles] = useState(role);
  const navigate = useNavigate();

  useEffect(() => {
    setRoles(role);
  }, [role]);

  useEffect(() => {
    navigate(`/authPage/login/${roles}`);
  }, [roles]);

  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  const signin = () => {
    login(email, password, roles)
      .then((res) => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_LEFT,
        });
        window.location.href = "/";
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || password.length < 6) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      signin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="contSignUp mdcntSgnUp mdcntSgnUp3">
      <div className="left-side mdQuSgnULfSd mdQuSgnULfSd3">
        <h2 style={{ fontFamily: "Georgia, serif" }}>Welcome Back!</h2>
        <p style={{ textAlign: "center", padding: "20px" }}>
          To keep connected with us please Sign up with your personal info
        </p>

        <Button
          className="sgnInBtn"
          onClick={() => navigate(`/authPage/signup/${roles}`)}
        >
          SIGN Up
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
                style={{ marginTop: "100px" }}
              >
                <h3
                  className="ms-4 px-5 fw-bold mt-7 signH3"
                  style={{ left: "30px" }}
                >
                  Sign In Now
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
                      style={{ marginTop: "35px", marginLeft: "180px" }}
                    >
                      Please provide a valid email.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  controlId="validationCustomPassword"
                  style={{ marginTop: "30px" }}
                >
                  <Form.Label>Password</Form.Label>
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
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={
                        validated && (!password || password.length < 6)
                      }
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </InputGroup.Text>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ marginTop: "35px", marginLeft: "84px" }}
                    >
                      {password.length < 6
                        ? "Password must be at least 6 characters long."
                        : "Please provide a valid password."}
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
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ marginLeft: "18px" }}
                    >
                      Please select a role.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button type="submit" className="adMrBtnUsrLs1">
                  {/* classname="sgnUpBtn" */}
                  <span>Login</span>
                </Button>

                <div
                  className="forget-btn"
                  style={{
                    position: "relative",
                    bottom: "40px",
                    right: "20px",
                  }}
                >
                  <span>
                    <p className="d-inline ">Forgot Password? </p>
                    <Link
                      className="text-decoration-none mdQuSgnUpbt3"
                      style={{
                        color: "rgb(167, 69, 69)",
                      }}
                      to={`/authPage/reset/${roles}`}
                      onClick={() => navigate(`/authPage/reset/${roles}`)}
                    >
                      Find Account
                    </Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
