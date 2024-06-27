import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Buttons from "../../components/Button/button";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Modal,
  Button,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { deleteReq, updateReq, completeReq } from "../../calls/requests/res";
import { postReviews, getReview } from "../../calls/review/reviewInfo";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({
  tutorInfo,
  selectedSlot,
  showButton,
  count,
  userType,
}) => {
  const navigate = useNavigate();

  const [matchedTimetable, setMatchedTimetable] = useState({});
  const [showDateAndTime, setShowDateAndTime] = useState({});
  const [showTutorData, setTutorData] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [ratingzero, setRatingzero] = useState(false);
  const [tId, setId] = useState({ tRegId: "", cId: "" });
  const [review, setReviews] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const deleteRequest = (id) => {
    const response = deleteReq(id);
  };

  const completeRequest = (id) => {
    const response = completeReq(id);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
    setRatingzero(value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (rating === 0 || !comments.trim()) {
      setRatingzero(rating);
    }
    postReviews(comments, rating, tId.tRegId, tId.cId);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const toggleDateAndTimeVisibility = (t_reg_id, s_reg_id, c_id) => {
    if (
      Object.keys(tutorInfo).length > 0 &&
      Object.keys(selectedSlots).length > 0
    ) {
      const matchedSlots = {};

      selectedSlots.forEach((slot) => {
        const {
          day,
          start_hour,
          status,
          subject,
          s_reg_id: slotSRegId,
          c_id: slotCId,
        } = slot;
        if (
          slot.t_reg_id === t_reg_id &&
          slotSRegId === s_reg_id &&
          slotCId === c_id
        ) {
          if (!matchedSlots[day]) {
            matchedSlots[day] = [];
          }
          matchedSlots[day].push({
            start_hour,
            status,
            subject,
            s_reg_id: slotSRegId,
          });
        }
      });

      setShowDateAndTime((prevState) => ({
        ...prevState,
        [`${s_reg_id}_${c_id}`]: !prevState[`${s_reg_id}_${c_id}`],
      }));

      setMatchedTimetable((prevState) => ({
        ...prevState,
        [`${s_reg_id}_${c_id}`]: matchedSlots,
      }));
    }
  };

  const acceptRequest = (id, studentId) => {
    if (
      Object.keys(tutorInfo).length > 0 &&
      Object.keys(selectedSlots).length > 0
    ) {
      const matchedSlots = {};

      selectedSlots.forEach((slot) => {
        const { day, start_hour, status, subject, s_reg_id } = slot;

        if (slot.t_reg_id === id) {
          console.log("Matched slot:", slot.s_reg_id);

          if (!matchedSlots[day]) {
            matchedSlots[day] = [];
          }

          // Add the slot to the corresponding day
          matchedSlots[day].push({
            start_hour,
            status,
            subject,
            s_reg_id,
          });
        }
      });

      setMatchedTimetable(matchedSlots);
      const response = updateReq(matchedSlots, studentId);
    }
  };

  const getReviews = () => {
    const response = getReview();
    if (response) {
      setReviews(response);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    if (tutorInfo.pending) {
      setTutorData(tutorInfo.pending);
      setSelectedSlots(selectedSlot.pending);
    } else {
      setTutorData(tutorInfo);
    }
  }, [tutorInfo.pending, selectedSlot.pending]);

  useEffect(() => {}, [matchedTimetable]);

  const handleClick = () => {
    setShowButtons(!showButtons);
    if (!showButtons) {
      setTimeout(() => {
        document.getElementById("btn1").style.transform = "translateX(0)";
      }, 0);
      setTimeout(() => {
        document.getElementById("btn2").style.transform = "translateX(0)";
      }, 500);
      setTimeout(() => {
        document.getElementById("btn3").style.transform = "translateX(0)";
      }, 1000);
    } else {
      document.getElementById("btn1").style.transform = "translateX(-100vw)";
      document.getElementById("btn2").style.transform = "translateX(-100vw)";
      document.getElementById("btn3").style.transform = "translateX(-100vw)";
    }
  };

  return (
    <>
      <div className="bg-body-tertiary" style={{ height: "100vh" }}>
        <br />
        <br />
        <div className="dashboard-grid">
          <div className="tDshAnm">
            <h1
              className="fs-2 font-weight-bold d-inline dashboard-left text-center mt-5 dashH1 mdQudashH1"
              style={{ marginLeft: "250px", marginTop: "10px" }}
            >
              Dashboard
            </h1>
          </div>

          <div
            className="button-space d-flex flex-direction-row w-50 dashButton tTwoBtnAnm mdQudashButton"
            style={{ fontFamily: "Georgia, serif", paddingRight: "80px" }}
          >
            {/* <Buttons
              text="Find a Tutor"
              className="adMrBtnDashFn"
              size="bg p-2 fs-6 w-25"
              onClick={() => {
                navigate("/student/searchScreen");
              }}
            /> */}

            <Button
              className="adMrBtnDashFn"
              size="bg p-2 w-25"
              onClick={() => {
                navigate("/student/searchScreen");
              }}
            >
              <span>Find a Tutor</span>
            </Button>

            <Button
              className="adMrBtnDashFn"
              size="bg ms-4 p-2 w-25"
              onClick={() => {
                navigate("/review");
              }}
            >
              <span>Reviews</span>
            </Button>
          </div>
        </div>

        <Container
          className="border-4 rounded tContAnm mdQutContAnm"
          style={{ marginBottom: "-30px" }}
        >
          <div className="dashboard-grid">
            <div
              className="border border-4 bg-white text-white rounded text-center p-3 mt-3 box-w mdQuBoxWw"
              style={{ width: "100%", borderRadius: "30px" }}
            >
              {/* <div className="topbutton">
                <button
                  type="button"
                  className="btn btn-dark tDshBtn1"
                  onClick={() => {
                    setTutorData(tutorInfo.pending);
                    setSelectedSlots(selectedSlot.pending);
                    setShowDateAndTime("");
                    setMatchedTimetable("");
                  }}
                >
                  Pending <span class="badge badge-dark">{count.pending}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-dark tDshBtn2"
                  onClick={() => {
                    setTutorData(tutorInfo.accepted);
                    setSelectedSlots(selectedSlot.accepted);
                    setShowDateAndTime("");
                    setMatchedTimetable("");
                  }}
                >
                  Accepted{" "}
                  <span class="badge badge-dark">{count.accepted}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-dark tDshBtn3"
                  onClick={() => {
                    setTutorData(tutorInfo.completed);
                    setSelectedSlots(selectedSlot.completed);
                    setShowDateAndTime("");
                    setMatchedTimetable("");
                  }}
                >
                  Completed{" "}
                  <span class="badge badge-dark">{count.completed}</span>
                </button>
              </div> */}

              <div className="topbutton">
                <button
                  type="button"
                  // className="btn btn-dark"
                  style={{ marginRight: "6px" }}
                  className="rounded-circle d-inline p-3 icnDsh"
                  // onClick={() => setShowButtons(!showButtons)}
                  onClick={handleClick}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </button>

                {showButtons && (
                  <>
                    <button
                      id="btn1"
                      type="button"
                      className="btn btn-dark tDshBtn1"
                      onClick={() => {
                        setTutorData(tutorInfo.pending);
                        setSelectedSlots(selectedSlot.pending);
                        setShowDateAndTime("");
                        setMatchedTimetable("");
                      }}
                    >
                      Pending{" "}
                      <span class="badge badge-dark">{count.pending}</span>
                    </button>
                    <button
                      id="btn2"
                      type="button"
                      className="btn btn-dark tDshBtn2"
                      onClick={() => {
                        setTutorData(tutorInfo.accepted);
                        setSelectedSlots(selectedSlot.accepted);
                        setShowDateAndTime("");
                        setMatchedTimetable("");
                      }}
                    >
                      Accepted{" "}
                      <span class="badge badge-dark">{count.accepted}</span>
                    </button>
                    <button
                      id="btn3"
                      type="button"
                      className="btn btn-dark tDshBtn3"
                      onClick={() => {
                        setTutorData(tutorInfo.completed);
                        setSelectedSlots(selectedSlot.completed);
                        setShowDateAndTime("");
                        setMatchedTimetable("");
                      }}
                    >
                      Completed{" "}
                      <span class="badge badge-dark">{count.completed}</span>
                    </button>
                  </>
                )}
              </div>

              <h3 className="p-3 text-black">Current Requests Table</h3>
              <div>
                <Container className="d-flex flex-column align-items-center bg-white rounded">
                  <Card.Body className="w-50">
                    <InputGroup className="">
                      <FormControl
                        placeholder="Search..."
                        aria-label="Search..."
                        aria-describedby="basic-addon2"
                        className="p-4 searchBorder"
                        // value={search}
                        // onChange={(e) => {
                        //     setSearch(e.target.value);
                        // }}
                        style={{ borderColor: "#c8c9c9" }}
                      />
                      <Button
                        variant="none"
                        id="button-addon2"
                        className="bg-myColor text-myTextColor myCustomColorDash"
                        //   onClick={getRequests}
                      >
                        <FontAwesomeIcon icon={faSearch} className="faSearch" />
                      </Button>
                    </InputGroup>
                  </Card.Body>
                  <br />
                </Container>
              </div>

              {showTutorData && Object.keys(showTutorData || {}).length > 0 && (
                <div className="text-center mt-3 text-black">
                  <h4
                    className="p-3 "
                    style={{ fontFamily: "Georgia, serif", fontSize: "25px" }}
                  >
                    {userType} Information
                  </h4>
                  {Object.keys(showTutorData || {}).map((key) => (
                    <div
                      key={key}
                      className="rounded text-center p-3 mt-3 box-w border rounded"
                      style={{
                        width: "100%",
                        fontFamily: "Georgia, serif",
                        color: "black",
                      }}
                    >
                      <div className="d-flex justify-content-between headingHist">
                        <div className="col-2 fs-5 mdQuDshImg">
                          <span>Image</span>
                        </div>
                        <div className="col-1 fs-5">
                          <span>Name</span>
                        </div>
                        <div className="col-1 fs-5">
                          <span>Gender</span>
                        </div>
                        <div className="col-1 fs-5">
                          <span>Address</span>
                        </div>
                        {userType === "Tutor" && (
                          <div className="col-1 fs-5">
                            <span>Price</span>
                          </div>
                        )}
                        <div className="col-1 fs-5">
                          <span>Time</span>
                        </div>
                        <div className="col-1 fs-5">
                          <span>Action</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between text-black headingHist">
                        <div className="col-2">
                          <img
                            className="mdQuImgSml"
                            src={showTutorData[key]?.image_data}
                            style={{
                              width: "140px",
                              height: "140px",
                              borderRadius: "10%",
                              marginLeft: "20px",
                              marginTop: "10px",
                            }}
                          />
                        </div>

                        <div
                          className="col-1 fs-5 "
                          style={{ marginTop: "24px" }}
                        >
                          <button className="button-show  mt-2 mdQuJsmn">
                            {showTutorData[key]?.t_name
                              ? `${showTutorData[key]?.c_id} ${showTutorData[key]?.t_lname}`
                              : `${showTutorData[key]?.s_fname} ${showTutorData[key]?.s_lname}`}
                          </button>
                        </div>

                        <div
                          className="col-1 fs-5 dtOfLst"
                          style={{ marginTop: "-15px" }}
                        >
                          <button className="button-show mt-5 btnShwChng mdQubtnShwChng">
                            {showTutorData[key]?.t_address ||
                              showTutorData[key]?.s_address}
                          </button>
                        </div>

                        <div
                          className="col-1 fs-5"
                          style={{ marginTop: "24px" }}
                        >
                          <button className="button-show mt-2 btnShwChng mdQubtnShwChng">
                            {showTutorData[key]?.t_gender ||
                              showTutorData[key]?.s_gender}
                          </button>
                          <br />
                        </div>

                        {userType === "Tutor" && (
                          <div
                            className="col-1 fs-5"
                            style={{ marginTop: "24px" }}
                          >
                            <button className="button-show mt-2 btnShwChng">
                              <p>{showTutorData[key]?.price}</p>
                            </button>
                          </div>
                        )}

                        <div
                          className="col-1 fs-5"
                          style={{ marginTop: "24px" }}
                        >
                          <button
                            className="button-show mt-2 btn-success seTm"
                            onClick={() => {
                              toggleDateAndTimeVisibility(
                                showTutorData[key]?.t_reg_id,
                                showTutorData[key]?.s_reg_id,
                                showTutorData[key]?.c_id
                              );
                            }}
                          >
                            {showDateAndTime[
                              `${showTutorData[key]?.s_reg_id}_${showTutorData[key]?.c_id}`
                            ]
                              ? "Hide"
                              : "See Time"}
                          </button>
                        </div>

                        <div
                          className="col-1 fs-5"
                          style={{ marginTop: "24px" }}
                        >
                          <>
                            {showTutorData[key]?.status === "accepted" && (
                              <button
                                className="button-show mt-2 btn-success seTm"
                                onClick={() => {
                                  navigate("/chats/chat");
                                }}
                              >
                                Chat
                              </button>
                            )}

                            {showButton === true && (
                              <>
                                {showTutorData[key]?.status === "pending" && (
                                  <button
                                    className="button-show mt-2 btn-success seTm"
                                    onClick={() =>
                                      acceptRequest(
                                        showTutorData[key]?.t_reg_id,
                                        showTutorData[key]?.s_reg_id
                                      )
                                    }
                                  >
                                    Accept Request
                                  </button>
                                )}

                                {showTutorData[key]?.status === "pending" && (
                                  <button
                                    className="button-show mt-2 btn-success seTm"
                                    onClick={() =>
                                      deleteRequest(showTutorData[key].s_reg_id)
                                    }
                                  >
                                    Delete
                                  </button>
                                )}
                              </>
                            )}
                          </>

                          {showTutorData[key]?.status === "accepted" &&
                            userType === "Student" && (
                              <button
                                className="button-show mt-5 btn-success seTm"
                                onClick={() =>
                                  completeRequest(showTutorData[key].s_reg_id)
                                }
                              >
                                Complete Request
                              </button>
                            )}

                          {showTutorData[key]?.status === "completed" &&
                            userType === "Tutor" &&
                            (showTutorData[key]?.reviewData?.value ===
                            "true" ? (
                              <button className="button-show mt-2 btn-success seTm">
                                Reviewed
                              </button>
                            ) : (
                              <button
                                className="button-show mt-2 btn-success seTm"
                                onClick={() => {
                                  setShowModal(true);
                                  setId({
                                    tRegId: showTutorData[key]?.t_reg_id,
                                    cId: showTutorData[key]?.c_id,
                                  });
                                }}
                              >
                                Review IT
                              </button>
                            ))}
                        </div>
                      </div>

                      {Object.keys(
                        matchedTimetable[
                          `${showTutorData[key]?.s_reg_id}_${showTutorData[key]?.c_id}`
                        ] || {}
                      ).length > 0 && (
                        <div className="text-center mt-3 text-black">
                          <div className="d-flex justify-content-between">
                            {console.log(
                              "Timetable data:",
                              matchedTimetable[
                                `${showTutorData[key]?.s_reg_id}_${showTutorData[key]?.c_id}`
                              ]
                            )}
                            ;
                            {Object.keys(
                              matchedTimetable[
                                `${showTutorData[key]?.s_reg_id}_${showTutorData[key]?.c_id}`
                              ]
                            ).map((day) => (
                              <div
                                key={day}
                                className={`rounded text-center p-3 mt-3 box-w border rounded mdQuThreeBx ${
                                  showDateAndTime[
                                    `${showTutorData[key]?.s_reg_id}_${showTutorData[key]?.c_id}`
                                  ]
                                    ? ""
                                    : "d-none"
                                }`}
                                style={{
                                  width: "100%",
                                  marginRight: 0,
                                  marginLeft: "auto",
                                  fontFamily: "Georgia, serif",
                                  color: "black",
                                }}
                              >
                                <div
                                  className="fs-5"
                                  style={{
                                    marginTop: "-1px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <span>Day:</span>
                                  <button className="button-show mt-2">
                                    {day}
                                  </button>
                                  <br />
                                </div>
                                {matchedTimetable[
                                  `${showTutorData[key]?.s_reg_id}_${showTutorData[key]?.c_id}`
                                ][day].map((slot, index) => (
                                  <div key={index}>
                                    <div className="d-flex justify-content-between text-black">
                                      <div
                                        className="col-3 fs-5"
                                        style={{ marginTop: "-5px" }}
                                      >
                                        <span>Time:</span>
                                        <button className="button-show mt-2 mdQuTmCen">
                                          {slot.start_hour}:00
                                        </button>
                                        <br />
                                      </div>

                                      <div
                                        className="col-5 fs-5"
                                        style={{ marginTop: "-5px" }}
                                      >
                                        <span>Subject:</span>
                                        <button className="button-show mt-2 mdQuTmCen2">
                                          {slot.subject.split(",").join("\n")}
                                        </button>
                                        <br />
                                      </div>
                                    </div>
                                    <hr className="mdQuHrBlwTmSb" />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <hr />
        </Container>

        <Modal
          show={showModal}
          onHide={handleModalClose}
          centered
          style={{ marginLeft: "5px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
              Rate Your Experience
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h5 style={{ fontFamily: "Georgia, serif", marginTop: "10px" }}>
                Give a star Rating
              </h5>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`star ${index < rating ? "star-filled" : ""}`}
                    onClick={() => handleRatingChange(index + 1)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </button>
                ))}
              </div>
              {ratingzero === 0 && (
                <div className="text-danger">Please select a rating.</div>
              )}

              <Form.Group
                md="10"
                controlId="validationCustom03"
                className="mt-3"
              >
                <h5 style={{ fontFamily: "Georgia, serif" }}>Comments</h5>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Comments"
                  className="mt-4"
                  value={comments}
                  onChange={handleCommentsChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a comment
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="mt-5 adMrBtnHm5">
                <span>Submit form</span>
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
