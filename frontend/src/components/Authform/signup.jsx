import React, { useState, useEffect } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signup } from "../../calls/auth/service";
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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    navigate(`/authPage/signup/${roles}`);
  }, [roles]);

  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  const register = () => {
    signup(email, name, password, roles)
      .then((res) => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_LEFT,
        });
        navigate(`/authPage/login/${roles}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      !email.includes("@gmail.com") ||
      password.length < 6
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      register();
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
          To keep connected with us please login with your personal info
        </p>

        <Button
          className="sgnInBtn"
          onClick={() => navigate(`/authPage/login/${roles}`)}
        >
          SIGN IN
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
                  className="ms-4 px-5 fw-bold mt-7 signH3"
                  style={{ left: "30px" }}
                >
                  Create Account
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
                      isInvalid={
                        validated && (!email || !email.includes("@gmail.com"))
                      }
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ marginTop: "35px", marginLeft: "150px" }}
                    >
                      Email must contain @gmail.com.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  controlId="validationCustomName"
                  style={{ marginTop: "30px" }}
                >
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Username"
                      className="signPlaceColor form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={validated && !name}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ marginTop: "35px", marginLeft: "194px" }}
                    >
                      Provide a valid username.
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
                      style={{ marginTop: "35px", marginLeft: "85px" }}
                    >
                      Password must be at least 6 characters long.
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
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ marginLeft: "18px" }}
                    >
                      Please select a role.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button type="submit" className="adMrBtnUsrLs mdQuSgnUpbt3">
                  {/* classname="sgnUpBtn1" */}

                  <span>Signup</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
