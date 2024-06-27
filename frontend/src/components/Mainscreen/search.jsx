import React, { useState, useEffect } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import Flag from "../../img/tutor1.png";
import DefaultImage from "../../img/user.png";
import Buttons from "../../components/Button/button";
import "./searchScreen.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdowns from "../../components/dropdown";
import { getPersonalTutor } from "../../calls/student/studentInfo";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import "./external.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Map from "../MapsView/Map";

const CenteredInputAndButton = () => {
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSideProfile = () => setShowMore(false);
  const handleSideShowProfile = () => setShowMore(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [individual, setIndividual] = useState([]);
  const [load, setLoader] = useState("true");
  const [showFilters, setShowFilters] = useState(false);
  const [showMapModal, setShowMapModal] = useState(true);

  const [directions, setDirection] = useState({ longitude: "", latitude: "" });

  const handleButtonClick = () => {
    console.log("click");
    setShowMapModal(false);
  };

  const [arrayOfObjects, setArrayOfObjects] = useState([
    {
      subject: "",
      gender: "",
      price: null,
      distance: "",
      rating: null,
    },
  ]);

  const handleSubjectChange = (label, selectedValue) => {
    setArrayOfObjects((prevArray) => {
      const updatedArray = prevArray.map((obj) => {
        switch (label) {
          case "Select Subject":
            return { ...obj, subject: selectedValue };
          case "Select Gender":
            return { ...obj, gender: selectedValue };
          case "Select Rating":
            return { ...obj, rating: selectedValue };
          case "Select Price":
            return { ...obj, price: selectedValue };
          case "Select Distance":
            return { ...obj, distance: selectedValue };
          default:
            return obj;
        }
      });

      console.log("Updated arrayOfObjects:", updatedArray);
      return updatedArray;
    });
  };

  const handleDeleteButtonClick = (index, fieldToDelete) => {
    setArrayOfObjects((prevArray) => {
      const updatedArray = prevArray.map((obj, i) => {
        if (i === index) {
          const updatedObject = { ...obj };
          switch (fieldToDelete) {
            case "subject":
              updatedObject.subject = "";
              break;
            case "gender":
              updatedObject.gender = "";
              break;
            case "rating":
              updatedObject.rating = null;
              break;
            case "distance":
              updatedObject.distance = "";
              break;
            case "price":
              updatedObject.price = null;
              break;
            default:
              break;
          }
          applyFilter();
          return updatedObject;
        }

        return obj;
      });

      console.log("Updated arrayOfObjects:", updatedArray);
      return updatedArray;
    });
  };

  const clearFilters = () => {
    setArrayOfObjects([
      {
        id: 1,
        subject: "",
        gender: "",
        price: null,
        distance: "",
        rating: null,
      },
    ]);
  };

  useEffect(() => {
    applyFilter();
  }, [arrayOfObjects]);

  useEffect(() => {}, [individual]);

  const applyFilter = (page) => {
    getPersonalTutor(arrayOfObjects, search, page)
      .then((res) => {
        setData(res);
        console.log(res);
        setLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const applyFilters = async () => {
    handleClose();
    setShowFilters(true);
    applyFilter();
    setLoader(true);
  };

  const passIndex = (index) => {
    setIndividual(data[index]);
  };

  const proposalScreen = (index) => {
    setIndividual(data[index]);
    navigate("/student/proposal", { state: { data: data[index] } });
  };

  const renderStars = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  return (
    <div>
      {/* main div */}
      {}
      {showMapModal === true ? (
        <div
          style={{
            backgroundColor: "#fff",
            minHeight: "100vh",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Container
            fluid
            className="d-flex flex-column align-items-center  bg-white mt-0 mb-2 "
          >
            <h3
              className="text-center mt-2 srchBtAnimt"
              variant="h4"
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "-15px",
              }}
              gutterBottom
            >
              Search Screen
            </h3>

            {/* <div className="search-bar"> */}
            <div
              // className="search-bar align-items-center w-50"
              className="d-flex align-items-center bg-white rounded"
              style={{ marginTop: "60px", width: "500px" }}
            >
              <Card.Body className="w-50 mdQusrchBrTp3">
                <InputGroup className="">
                  <FormControl
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="basic-addon2"
                    className="p-4 searchBorder"
                    style={{ borderColor: "#c8c9c9" }}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button
                    variant="none"
                    id="button-addon2"
                    className="bg-myColor text-myTextColor myCustomColorDash"
                    onClick={applyFilter}
                  >
                    <FontAwesomeIcon icon={faSearch} className="faSearch" />
                  </Button>
                </InputGroup>
              </Card.Body>
            </div>

            <div
              className="button-group srcAnimt mdQuPrpClrAp3"
              style={{ marginTop: "20px" }}
            >
              <Button
                // variant="outline-primary"
                onClick={handleShow}
                className="filter-button adFltr"
                size="lg"
              >
                <h1 className="requestH1 mdQuAddFl3">
                  <span>Add Filters</span>
                </h1>
              </Button>
              <Button
                // variant="outline-primary"
                size="lg"
                text=""
                className="filter-button ms-3 clrFltr"
                onClick={() => {
                  clearFilters();
                }}
              >
                <h1 className="requestH1">
                  <span>Clear Filters</span>
                </h1>
              </Button>
            </div>
            {/* </div> */}

            {showFilters === true ? (
              <div className="d-flex align-items-center mt-5">
                
                {arrayOfObjects.length > 0 &&
                  arrayOfObjects.map((obj, index) => (
                    <div key={obj.id} className="mb-2">
                      <div className="d-flex align-items-center">
                        {obj.subject && obj.subject !== "" && (
                          <div className="ms-2">
                            <Button
                              variant="primary"
                              className="ms-2 filterInBox"
                            >
                              {obj.subject}
                              <Button
                                variant="outline-secondary"
                                bg="red"
                                onClick={() =>
                                  handleDeleteButtonClick(index, "subject")
                                }
                                className="ms-5 filterCross"
                              >
                                &times;
                              </Button>
                            </Button>
                          </div>
                        )}

                        {obj.gender && obj.gender !== "" && (
                          <div className="ms-2">
                            <Button
                              variant="primary"
                              className="ms-2 filterInBox"
                            >
                              {obj.gender}
                              <Button
                                variant="outline-secondary"
                                bg="red"
                                onClick={() =>
                                  handleDeleteButtonClick(index, "gender")
                                }
                                className="ms-5 filterCross"
                              >
                                &times;
                              </Button>
                            </Button>
                          </div>
                        )}

                        {obj.rating !== null && (
                          <div className="ms-2">
                            <Button
                              variant="primary"
                              className="ms-2 filterInBox"
                            >
                              {obj.rating}
                              <Button
                                variant="outline-secondary"
                                bg="red"
                                onClick={() =>
                                  handleDeleteButtonClick(index, "rating")
                                }
                                className="ms-5 filterCross"
                              >
                                &times;
                              </Button>
                            </Button>
                          </div>
                        )}

                        {obj.distance !== "" && (
                          <div className="ms-2">
                            <Button
                              variant="primary"
                              className="ms-2 filterInBox"
                            >
                              {obj.distance}
                              <Button
                                variant="outline-secondary"
                                bg="red"
                                onClick={() =>
                                  handleDeleteButtonClick(index, "distance")
                                }
                                className="ms-5 filterCross"
                              >
                                &times;
                              </Button>
                            </Button>
                          </div>
                        )}

                        {obj.price !== null && (
                          <div className="ms-2">
                            <Button
                              variant="primary"
                              className="ms-2 filterInBox"
                            >
                              {obj.price}
                              <Button
                                variant="outline-secondary"
                                bg="red"
                                onClick={() =>
                                  handleDeleteButtonClick(index, "price")
                                }
                                className="ms-5 filterCross"
                              >
                                &times;
                              </Button>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : null}

            

            {/* This one */}
            <>
              <div className={`load ${load ? "blurred" : ""}`}>
                {load === "true" ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  <div className="top-ml" style={{ marginTop: "50px" }}>
                    {data
                        .filter(tutor => tutor.approve === "true")
                        .map((tutor, index) => (
                      <div
                        key={tutor.t_reg_id}
                        className="d-flex justify-content-center p-3 mt-3 srcCntBlw"
                        style={{
                          width: "93%",
                          height: "100%",
                        }}
                      >
                        {/* Left Container */}
                        <div
                          className="left-container text-center p-3"
                          style={{
                            width: "30%",
                            boxShadow: "5px 5px 10px grey",
                            borderRadius: "10px",
                          }}
                        >
                          <img
                            src={tutor.image_data || DefaultImage}
                            width="160"
                            height="160"
                            alt="Tutor"
                            className="mb-3 mdQuSrchImgOn"
                            style={{
                              boxShadow: "10px 10px 5px grey",
                              borderRadius: "10%",
                              marginTop: "10px",
                            }}
                          />
                          <div className="space mb-3 srchByScrnLf">
                            <p className="fs-4 lF1">
                              {tutor.t_name} {tutor.t_lname}
                            </p>
                            <p className="fs-5 lF2">{tutor.t_gender}</p>
                            <p className="fs-5 lF3">{tutor.t_address}</p>

                            {/* <p className="fs-5 lF4">Ratings</p>
                        <p className="lF4i">
                          {tutor.rating ? `${tutor.rating}/5` : "Not available"}
                        </p>
                        
                        <p className="fs-5 lF5">Charges</p>
                        <p className="lF5i">
                          Price:{" "}
                          <span className="fontSize ms-2">
                            {tutor.price}/pkr
                          </span>
                        </p> */}
                          </div>
                          {tutor.matched_reqslot === false ? (
                            <Button
                              className="btn btn-primary mt-1 adMrBtnSrcLf1"
                              size="bg p-2 w-25"
                              onClick={() => {
                                proposalScreen(index);
                              }}
                            >
                              <span>Send Request</span>
                            </Button>
                          ) : (
                            <Button className="btn btn-primary mt-3 adMrBtnSrcLf1">
                              <span>Request Already Exists</span>
                            </Button>
                          )}
                        </div>

                        {/* Right Container */}
                        <div
                          className="right-container p-3"
                          style={{
                            width: "65%",
                            marginLeft: "5%",
                            boxShadow: "5px 5px 10px grey",
                            borderRadius: "10px",
                          }}
                        >
                          {/* Right Container Content */}
                          <div
                            className="space mb-3 fontSize srchByScrnRt"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <p
                                className="fs-5 rT1"
                                style={{ marginTop: "38px" }}
                              >
                                Students Teach
                              </p>
                              <p>2</p>
                            </div>
                            <div className="mdQuSrchRt1">
                              <p
                                className="fs-5 rT1"
                                style={{
                                  marginTop: "38px",
                                  marginRight: "150px",
                                }}
                              >
                                Currently Student
                              </p>
                              <p>2</p>
                            </div>
                          </div>

                          <div
                            className="space mb-3 srchByScrnLfTrT"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {/* Ratings */}
                            <div>
                              <p className="fs-5 lF4p">Ratings</p>
                              {/* <p className="lF4ip">
                                {tutor.rating
                                  ? `${tutor.rating}/5`
                                  : "Not available"}
                              </p> */}
                              <p className="lF4ip">
                                {tutor.average_rating
                                  ? renderStars(tutor.average_rating)
                                  : "Not Rated Yet"}
                              </p>
                            </div>
                            <div className="mdQuSrchRt1">
                              {/* Charges */}
                              <p className="fs-5 lF5p">Charges</p>
                              <p className="lF5ip">
                                Price:{" "}
                                <span className="fontSize ms-2">
                                  {tutor.price}/pkr
                                </span>
                              </p>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              className="space mb-4 col-2"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              <p className="ms-50 pFontSize rT3">Subjects</p>
                              {tutor.subject &&
                              tutor.subject.startsWith("{") ? (
                                tutor.subject
                                  .slice(1, -1)
                                  .split(",")
                                  .map((subject, i) => (
                                    <input
                                      key={i}
                                      type="text"
                                      className="srcScrBstdSbjct mb-2 w-100"
                                      readOnly
                                      value={subject.replace(/"/g, "").trim()}
                                    />
                                  ))
                              ) : (
                                <input
                                  type="text"
                                  className="form-control border rounded text-center bg-info text-light mb-2 w-50"
                                  readOnly
                                  value={tutor.subject}
                                  style={{ marginTop: "18px" }}
                                />
                              )}
                              <div className="mpBtnDv">
                                <Button
                                  className="btn btn-primary mt-1 adMrBtnSrcMap mdQuSrchMap"
                                  onClick={() => {
                                    handleButtonClick(
                                      setDirection({
                                        latitude: tutor.latitude,
                                        longitue: tutor.longitude,
                                      })
                                    );
                                  }}
                                >
                                  {/* Find a Tutor */}
                                  <span>Map View</span>
                                </Button>
                              </div>
                            </div>

                            <div
                              className="space mb-3 col-2"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              <p
                                className="fs-5 rT4 mdQuSrcAbt"
                                style={{ marginTop: "18px" }}
                              >
                                About
                              </p>
                              <div className="overflow-ellipsis rT4i mdQuSrcLrm">
                                {tutor.about}
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sunt culpa rem laborum
                                eligendi quam soluta dicta explicabo fugit odit
                                autem maiores blanditiis nulla temporibus,
                                laudantium, inventore voluptates! Dicta, ipsa
                                velit. fugit odit autem maiores blanditiis nulla
                                temporibus, laudantium, inventore voluptates!
                                Dicta, ipsa velit.
                              </div>
                              <button
                                className="btn btn-primary mt-4 adMrBtnSrc mdQuSrcAbt"
                                onClick={() => {
                                  handleSideShowProfile();
                                  passIndex(index);
                                }}
                              >
                                {/* See more */}
                                <span>See more</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>

            <div>
              <Offcanvas
                show={show}
                onHide={handleClose}
                className="canvas-w"
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <h2
                    className="text-center"
                    variant="h4"
                    style={{
                      fontFamily: "Georgia, serif",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "-25px",
                      marginTop: "60px",
                      width: "100%",
                    }}
                    gutterBottom
                  >
                    Filters
                  </h2>
                </Offcanvas.Header>

                <Offcanvas.Body>
                  <div className="d-flex align-items-center mt-5">
                    {arrayOfObjects.length > 0 &&
                      arrayOfObjects.map((obj, index) => (
                        <div key={obj.id} className="mb-2">
                          <div className="d-flex align-items-center">
                            {obj.subject && obj.subject !== "" && (
                              <div className="ms-2">
                                <Button
                                  variant="primary"
                                  className="ms-2 filterInBox"
                                >
                                  {obj.subject}
                                  <Button
                                    variant="outline-secondary"
                                    bg="red"
                                    onClick={() =>
                                      handleDeleteButtonClick(index, "subject")
                                    }
                                    className="ms-5 filterCross"
                                  >
                                    &times;
                                  </Button>
                                </Button>
                              </div>
                            )}

                            {obj.gender && obj.gender !== "" && (
                              <div className="ms-2">
                                <Button
                                  variant="primary"
                                  className="ms-2 filterInBox"
                                >
                                  {obj.gender}
                                  <Button
                                    variant="outline-secondary"
                                    bg="red"
                                    onClick={() =>
                                      handleDeleteButtonClick(index, "gender")
                                    }
                                    className="ms-5 filterCross"
                                  >
                                    &times;
                                  </Button>
                                </Button>
                              </div>
                            )}

                            {obj.rating !== null && (
                              <div className="ms-2">
                                <Button
                                  variant="primary"
                                  className="ms-2 filterInBox"
                                >
                                  {obj.rating}
                                  <Button
                                    variant="outline-secondary"
                                    bg="red"
                                    onClick={() =>
                                      handleDeleteButtonClick(index, "rating")
                                    }
                                    className="ms-5 filterCross"
                                  >
                                    &times;
                                  </Button>
                                </Button>
                              </div>
                            )}

                            {obj.distance !== "" && (
                              <div className="ms-2">
                                <Button
                                  variant="primary"
                                  className="ms-2 filterInBox"
                                >
                                  {obj.distance}
                                  <Button
                                    variant="outline-secondary"
                                    bg="red"
                                    onClick={() =>
                                      handleDeleteButtonClick(index, "distance")
                                    }
                                    className="ms-5 filterCross"
                                  >
                                    &times;
                                  </Button>
                                </Button>
                              </div>
                            )}

                            {obj.price !== null && (
                              <div className="ms-2">
                                <Button
                                  variant="primary"
                                  className="ms-2 filterInBox"
                                >
                                  {obj.price}
                                  <Button
                                    variant="outline-secondary"
                                    bg="red"
                                    onClick={() =>
                                      handleDeleteButtonClick(index, "price")
                                    }
                                    className="ms-5 filterCross"
                                  >
                                    &times;
                                  </Button>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                  <>
                    <hr />
                    <div
                      className="d-flex flex-row ms-3 "
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      <Dropdowns
                        className="srchFltr"
                        label="Select Subject"
                        options={[
                          "Math",
                          "English",
                          "Science",
                          "Urdu",
                          "Isl",
                          "Arts",
                        ]}
                        onSelect={(selectedValue) =>
                          handleSubjectChange("Select Subject", selectedValue)
                        }
                      />
                      <div className="ms-5"></div>
                      <Dropdowns
                        label="Select Gender"
                        options={["Male", "Female"]}
                        onSelect={(selectedValue) =>
                          handleSubjectChange("Select Gender", selectedValue)
                        }
                      />
                    </div>

                    <div
                      className="d-flex flex-row ms-3"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      <Dropdowns
                        label="Select Rating"
                        options={["5", "4", "3", "2", "1"]}
                        onSelect={(selectedValue) =>
                          handleSubjectChange("Select Rating", selectedValue)
                        }
                      />
                      <div className="ms-5"></div>
                      <Dropdowns
                        label="Select Price"
                        options={[500, 1000, 1500, 2000, 2500, 3000]}
                        onSelect={(selectedValue) =>
                          handleSubjectChange("Select Price", selectedValue)
                        }
                      />
                    </div>

                    <div
                      className="d-flex flex-row"
                      style={{
                        marginLeft: "112px",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      <Dropdowns
                        label="Select Distance"
                        options={["5", "10", "15", "25", "30"]}
                        onSelect={(selectedValue) =>
                          handleSubjectChange("Select Distance", selectedValue)
                        }
                      />
                      <div className="ms-5"></div>
                    </div>
                    <hr />
                    <div
                      className=" space d-flex align-items-center"
                      style={{
                        marginRight: "110px",
                        fontFamily: "Georgia, serif",
                        marginTop: "37px",
                      }}
                    >
                      <div className="d-flex justify-content-center">
                        <Button
                          className="ms-5 mb-2 adFltr kpItCntr"
                          onClick={() => {
                            clearFilters();
                          }}
                        >
                          <span className="fntOfApl">Clear Filter</span>
                        </Button>

                        <Button
                          className="ms-5 mb-2 clrFltr kpItCntr adfilters"
                          onClick={() => {
                            applyFilters();
                          }}
                        >
                          <span className="fntOfApl">Apply Filters</span>
                        </Button>
                      </div>

                      {/* <div
                    className="button-group srchFlterBtn"
                    style={{ marginTop: "20px" }}
                  >
                    <Button
                      onClick={() => {
                        clearFilters();
                      }}
                      className="filter-button adFltr"
                      size="lg"
                    >
                      <h1 className="requestH1">Add Filters</h1>
                    </Button>
                    <Button
                      size="lg"
                      text=""
                      className="filter-button ms-3 clrFltr"
                      onClick={() => {
                        clearFilters();
                      }}
                    >
                      <h1 className="requestH1">Clear Filters</h1>
                    </Button>
                  </div> */}
                    </div>
                  </>
                </Offcanvas.Body>
              </Offcanvas>
            </div>

            <div>
              <Offcanvas
                show={showMore}
                onHide={handleSideProfile}
                className="w-50 mdQuMiniCont"
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <div className="canvas-title">
                    <Offcanvas.Title className="canvas-title  "></Offcanvas.Title>
                  </div>
                </Offcanvas.Header>
                <div className="space mb-3 ">
                  <h3 style={{ marginBottom: "-47px" }}>Mini Profile</h3>
                </div>
                <hr />

                <Offcanvas.Body>
                  <div className="space d-flex flex-direction-row mdQuMnImgPr">
                    <img
                      src={individual.image_data || DefaultImage}
                      width="160"
                      height="160"
                      alt="Flag"
                      className="mb-1"
                      style={{
                        boxShadow: "10px 10px 5px grey",
                        borderRadius: "30%",
                      }}
                    />

                    <div className="ms-5" style={{ marginTop: ":90px" }}>
                      <h3
                        className="text-center mt-2 minPofile"
                        variant="h4"
                        style={{
                          fontFamily: "Georgia, serif",
                          fontWeight: "bold",
                          textAlign: "center",
                          marginBottom: "20px",
                        }}
                        gutterBottom
                      >
                        {individual.t_name}&nbsp;{individual.t_lname}
                      </h3>

                      <h5
                        className="mt-2 mdQuMnRtng"
                        style={{
                          marginLeft: "90px",
                          fontFamily: "Georgia, serif",
                          lineHeight: "0.8",
                        }}
                      >
                        Rating: &nbsp;{" "}
                        {individual.average_rating
                          ? `${Math.round(individual.average_rating)}/5`
                          : "Not Rated Yet"}
                        <br></br>
                        <br></br>
                        {individual.t_degreetype} in {individual.t_degree}
                      </h5>
                      <p></p>
                    </div>
                  </div>
                  <>
                    <br />
                    <hr />
                    <div className="space mb-3 ">
                      <h3 style={{ marginTop: "8px" }}>About</h3>
                      <p className="pFontSize">
                        <span
                          className="fontSize"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {individual.about}
                        </span>
                      </p>
                    </div>
                    <hr />

                    <div
                      className=" space mb-3"
                      style={{
                        marginRight: "110px",
                        fontFamily: "Georgia, serif",
                        marginTop: "30px",
                      }}
                    >
                      <h3 className="fs-2">Subjects</h3>
                      <br></br>

                      {individual.subject &&
                      individual.subject.startsWith("{") ? (
                        individual.subject
                          .slice(1, -1)
                          .split(",")
                          .map((subject, i) => (
                            <input
                              key={i}
                              type="text"
                              // className="form-control border rounded text-center bg-info text-light mb-2 w-50 fs-5"
                              className="srcScrBstd mb-2 "
                              readOnly
                              value={subject.replace(/"/g, "").trim()}
                            />
                          ))
                      ) : (
                        <input
                          type="text"
                          className="form-control border rounded text-center bg-info text-light mb-2 w-10"
                          readOnly
                          value={individual.subject}
                          style={{ marginTop: "18px" }}
                        />
                      )}
                    </div>
                    <hr />
                    <div
                      className=" space mb-3"
                      style={{
                        marginRight: "110px",
                        fontFamily: "Georgia, serif",
                        marginTop: "30px",
                      }}
                    >
                      <h1 className="fs-2">Ratings</h1>
                      <br></br>

                      <div>
                        {individual?.reviews?.map((review, index) => (
                          <div key={index} className="mb-2 fs-5">
                            Rating:
                            <p style={{ fontSize: "40px" }}>
                              {" "}
                              {renderStars(review.rating)}
                            </p>
                            <p>Comment: {review.comment}</p>
                            <hr />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Container>
        </div>
      ) : (
        <Map setShowMapModal={setShowMapModal} directions={directions} />
      )}
    </div>
  );
};

export default CenteredInputAndButton;
