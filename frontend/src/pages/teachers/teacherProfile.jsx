import React, { useState, useEffect } from "react";
import Buttons from "../../components/Button/button";
import { useQualificationContext } from "../../context/qualifyContext";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import "../../cssFile/teacherDashboard.css";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { getPersonalTutor } from "../../calls/tutor/tutorPersonal";
import { getQualifications } from "../../calls/tutor/tutorQualification";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faDollarSign,
  faInfoCircle,
  faBook,
  faChalkboardTeacher,
  faCertificate,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { getReview } from "../../calls/review/reviewInfo";
const TutorProfile = () => {
  const [personalData, setPersonalData] = useState("");
  const [qualifyData, setQualifyData] = useState([]);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();
  const { updateSelectedQualification } = useQualificationContext();
  const { clearQualification } = useQualificationContext();

  const personal = () => {
    getPersonalTutor().then((res) => {
      setPersonalData(res);
      console.log(res)

    });
  };

  const qualify = () => {
    getQualifications()
      .then((res) => {
        setQualifyData(res);
      })
      .catch((error) => {
        console.log("error",error);
      });
  };

  const review = () => {
    getReview().then((res) => {
      setReviews(res);
    });
  };

  useEffect(() => {
    personal();
    qualify();
    review();
  }, []);

  const handleEditClick = (qualification) => {
    updateSelectedQualification(qualification);
    navigate("/teachers/qualificationProfile");
  };

  function restartAnimation(element, delay) {
    element.classList.remove("animate");
    setTimeout(function () {
      element.classList.add("animate");
    }, delay);
  }

  var observer = new MutationObserver(function () {
    var elements = [
      document.querySelector(".tProfileCon4"),
      document.querySelector(".tProfileCon5"),
      document.querySelector(".tProfileCon66"),
    ];

    if (elements.every((element) => element !== null)) {
      restartAnimation(elements[0], 0);
      restartAnimation(elements[1], 500);
      restartAnimation(elements[2], 1000);

      observer.disconnect();
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document, { childList: true, subtree: true });

  return (
    <div className="tutorProfile bg-white w-100">
      <br></br>
      <br></br>

     

      <br></br>
      <Row
        style={{
          marginTop: "20px",
          marginLeft: "60px",
          marginRight: "60px",
          display: "flex",
        }}
      >
        <Col sm={4}>
          {/* Container 1 */}
          <Container className="tProfileCon1">
            <div className="col-2 mdQuImgProTch mdQuImgProTch3">
              <img
                src={personalData[0]?.ima}
                alt="Tutor"
                style={{
                  marginTop: "20px",
                  marginLeft: "-10px",
                  marginBottom: "12px",
                }}
                className="tutor-image"
              />
            </div>
            <h2 style={{ fontSize: "25px", marginTop: "4px" }}>
              {personalData[0]?.t_name} {personalData[0]?.t_lname}
            </h2>
            <div></div>

            <br />
            <div style={{ marginBottom: "20px", padding: "10px" }}>
              <Row style={{ fontFamily: "Georgia, serif" }}>
                <Col sm={6} className="text-left longColumn">
                  <p>Active students:</p>
                  <p>Students teach:</p>
                  <p>From:</p>
                </Col>
                <Col sm={6} className="text-right mdQuValClm3">
                  <p id="activeStudents">0</p>
                  <p id="numLessons">0</p>
                  <p id="location" className="mdQuLoc3">
                    {personalData[0]?.t_address} {personalData[0]?.t_city},
                    Pakistan
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          {/* Container 2 */}
          <Container
            className="tProfileCon2"
            style={{
              backgroundColor: "#f8f9fa",
              height: "150px",
              margin: "20px auto",
            }}
          >
            <h2>
              <FontAwesomeIcon
                style={{ color: "rgb(186, 27, 27)", fontSize: "30px" }}
                icon={farThumbsUp}
              />{" "}
              Reviews{" "}
            </h2>
            <div className="ms-5 mt-3">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${
                    index < reviews.averageRating ? "star-filled " : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faStar} className="strProTech" />
                </span>
              ))}
            </div>
          </Container>

          {/* Container 3 */}
          <Container
            className="tProfileCon2 mdQutProfileCon2"
            style={{
              backgroundColor: "#f8f9fa",
              height: "150px",
              margin: "20px auto",
            }}
          >
            <h2>
              <FontAwesomeIcon
                style={{ color: "rgb(186, 27, 27)", fontSize: "30px" }}
                icon={faDollarSign}
              />{" "}
              Tuition Rate{" "}
            </h2>
            {/* <h2>Tuition Rate</h2> */}

            <p className="minPrcRt">
              Min: Rs. {personalData?.[0]?.price} / Lecture
            </p>

            {/* <p style={{ marginTop: "-5px" }}>
              Max: Rs. {courseData?.[0]?.max_price} / month
            </p> */}
          </Container>
        </Col>
        <Col sm={8}>
          <Container
            className="tProfileCon4 mdQutProfileCon4 mdQutProfileCon43"
            style={{
              backgroundColor: "#f8f9fa",
              height: "200px",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <h2>
              <FontAwesomeIcon
                style={{
                  color: "rgb(186, 27, 27)",
                  fontSize: "28px",
                  marginLeft: "20px",
                }}
                icon={faInfoCircle}
              />{" "}
              <span style={{ marginLeft: "5px" }}> About </span>
            </h2>
            {/* <h2>About</h2> */}
            <p className="abtInfTech">{personalData[0]?.about}</p>
          </Container>

          {/* Container 5 */}
          <Container
            className="tProfileCon5"
            style={{
              backgroundColor: "#f8f9fa",
              // margin: "20px auto",
              // padding: "40px",
              // height: "200px",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <h2>
              <FontAwesomeIcon
                style={{
                  color: "rgb(186, 27, 27)",
                  fontSize: "28px",
                  marginLeft: "20px",
                }}
                icon={faChalkboardTeacher}
              />{" "}
              <span className="mdQusubTch3" style={{ marginLeft: "6px" }}>
                {" "}
                Subjects Teach{" "}
              </span>
            </h2>
            {/* <h2>Subjects Teach</h2> */}

            {personalData[0]?.subject &&
              personalData[0]?.subject
                .replace(/[{}]/g, "")
                .split(",")
                .map((subject, index) => (
                  <div className="subjectCon5" key={index}>
                    <p className="sbTech">{subject.trim()}</p>
                    <hr />
                  </div>
                ))}
          </Container>

          {/* Container 6 */}
          <Container
            className=" rounded w-100 tProfileCon66"
            style={{
              backgroundColor: "#f8f9fa",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <div className="d-inline">
              <h2>
                <FontAwesomeIcon
                  style={{
                    color: "rgb(186, 27, 27)",
                    fontSize: "28px",
                    marginLeft: "30px",
                  }}
                  icon={faGraduationCap}
                />{" "}
                <span
                  className="mdQuqual3"
                  style={{ marginLeft: "5px", fontFamily: "Georgia, serif" }}
                >
                  {" "}
                  Qualification{" "}
                </span>
              </h2>
              {/* <h2>Qualification</h2> */}
            </div>
            <div className="subjectCon5 ">
              <Table responsive striped className="tbleProTech">
                <thead className="tbleHedProTech">
                  <tr>
                    <th>Degree Name</th>
                    <th>Institute</th>
                    <th>Degree Type</th>
                    <th>Campus</th>
                    <th>Degree Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {qualifyData.map((qualification, index) => (
                    <tr key={index}>
                      <td>{qualification.t_degree}</td>
                      <td>{qualification.t_institute}</td>
                      <td>{qualification.t_degreetype}</td>
                      <td>{qualification.city}</td>
                      <td>
                        {qualification.t_degreeyear}-{qualification.year_end}
                      </td>
                      <td>
                        <Buttons
                          className="edtProTech"
                          text={
                            <>
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="edtIcnProTech"
                                // className="me-2 "
                              />
                              {/* Edit */}
                            </>
                          }
                          onClick={() => handleEditClick(qualification)}
                        />
                        {/* <Buttons
                          text={
                            <>
                              <FontAwesomeIcon icon={faTrash} className="me-2" />
                              Delete
                            </>}
                          onClick={() => deleteQualifyTutor(qualification.id)}/> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-center flex-direction-row">
                {/* <Buttons
                  className="adMrBtn mdQuadMrBtn3"
                  text="Add More"
                  size="bg p-2 fs-6 w-25"
                  onClick={() => {
                    navigate("/teachers/qualificationProfile");
                    clearQualification();
                  }}
                /> */}

                <Button
                  className="adMrBtn mdQuadMrBtn3"
                  size="bg p-2 w-25"
                  onClick={() => {
                    navigate("/teachers/qualificationProfile");
                    clearQualification();
                  }}
                >
                  <span>Add More</span>
                </Button>
              </div>
            </div>
          </Container>
        </Col>
      </Row>
      <br></br>
      <br></br>
    </div>
  );
};

export default TutorProfile;
