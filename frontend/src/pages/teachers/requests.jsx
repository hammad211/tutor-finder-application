import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import Flag from "../../img/tutor1.png";
import Buttons from "../../components/Button/button";
// import "../../cssFile/searchScreen.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdowns from "../../components/dropdown";
import { getPersonalTutor } from "../../calls/student/studentInfo";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { useQualificationContext } from "../../context/qualifyContext";
import { postReq } from "../../calls/requests/res";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  const [load, setLoader] = useState("false");
  // const [req, setReq] = useState("");
  const [socket, setSocket] = useState("");
  useEffect(() => {
    setSocket(io("http://localhost:5080"));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("Proposal", () => {
        getRequests();
      });
      return () => {
        socket.disconnect();
      };
    }
    return () => {};
  }, [socket]);

  const [arrayOfObjects, setArrayOfObjects] = useState([
    {
      subject: "",
      gender: "",
      price: null,
      distance: "",
      rating: null,
    },
  ]);

  const handleClick = async (data) => {
    // updateSelectedQualification(data);
    console.log(data);

    try {
      const response = await postReq(
        data?.[0]?.comments,
        data?.[0]?.class_level,
        data?.[0]?.subject,
        data?.[0]?.price,
        data?.[0]?.s_reg_id,
        data?.[0]?.t_reg_id,
        data?.[0]?.id
      );

      navigate("/teachers/teacherDashboard");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const getRequests = async () => {
    // try {
    //   getProposal(search)
    //     .then((res) => {
    //       setReq(res);
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       setReq("");
    //       console.error("Error fetching data:", error);
    //     });
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    getRequests();
  }, [search]);

  useEffect(() => {
    getData();
  }, []);

  const getData = (page) => {
    // getProposal(arrayOfObjects, search, page)
    //   .then((res) => {
    //     setData(res);
    //     setLoader(false);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  const passIndex = (index) => {
    setIndividual(data[index]);
    console.log(individual);
  };

  const loremIpsum =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt culpa rem laborum eligendi quam soluta dicta explicabo fugit odit autem maiores blanditiis nulla temporibus, laudantium, inventore voluptates! Dicta, ipsa velit.";
  const truncatedText = loremIpsum.slice(0, 10);

  // Dummy data for testing
  const dummyData = [
    {
      id: 1,
      s_fname: "John",
      s_lname: "Doe",
      s_gender: "Male",
      s_address: "123 Main St",
      subject: "Math",
      class_level: "High School",
      price: "$30",
      distance: "5",
      comments: "Experienced tutor",
    },
    // Add more dummy data as needed
  ];

  const [req, setReq] = useState(dummyData);

  return (
    <div
      style={{ width: "100%", marginTop: "40px" }}
      className="d-flex justify-content-center"
    >
      <Container
        fluid
        className="d-flex flex-column align-items-center bg-white mt-0 mb-2"
        style={{ minHeight: "100vh", minWidth: "100%" }}
      >
        <h1 className="dashboard-heading text-secondary studentProtH1">
          Find Students
        </h1>

        <div
          className="search-bar align-items-center w-50"
          style={{ marginTop: "60px" }}
        >
          <InputGroup className="h-40 rounded search-input-group">
            <FormControl
              placeholder="Search"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderColor: "#6c757d", fontFamily: "Georgia, serif" }}
            />
            <Button
              variant="outline-secondary"
              size="lg"
              className="search-button"
              // style={{ color: "white" }}
              onClick={getRequests}
            >
              {/* Search */}
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
          <Button
            variant="outline-primary"
            onClick={() => {
              setSearch("");
            }}
            className="filter-button"
            size="lg"
          >
            {/* Clear Search */}
            <h1 className="requestH1">Clear Search</h1>
          </Button>
        </div>
        {Array.isArray(req) ? (
          req.map((tutor, index) => (
            <div
              key={tutor.id}
              className="box-1000x1000 rounded text-center p-3 mt-3 d-flex justify-content-center flex-direction-row box-w shadow"
              style={{ boxShadow: "10px 10px 5px black", width: "90%" }}
            >
              <div className="d-inline-block align-bottom">
                <img
                  src={Flag}
                  width="190"
                  height="190"
                  alt="Flag"
                  className="mb-3"
                  style={{
                    boxShadow: "10px 10px 5px grey",
                    borderRadius: "10%",
                  }}
                />
                <input
                  type="text"
                  className="form-control border rounded text-center bg-info text-light mb-2 mt-4 "
                  readOnly
                  value={tutor.s_address}
                />
                <Buttons
                  text="Accept Request"
                  onClick={() => handleClick(data)}
                />
              </div>

              <div className="space mb-4">
                <h5 style={{ marginTop: "8px" }}>
                  {tutor.s_fname} {tutor.s_lname}
                </h5>
                <p style={{ marginTop: "8px" }} className="fs-5">
                  {tutor.s_gender}{" "}
                </p>
                <p className="ms-50 pFontSize mt-5">Subject</p>
                <input
                  value={tutor.subject}
                  type="text"
                  className="form-control border rounded text-center bg-info text-light mb-2 w-10"
                  readOnly
                  style={{ marginTop: index === 0 ? "18px" : "0px" }}
                />
              </div>

              <div className="space vl"></div>
              <div className="space mb-3 fontSize">
                <h5 style={{ marginTop: "10px" }}> Class Level</h5>
                <p>{tutor.class_level} Student</p>
                <h5 style={{ marginTop: "38px" }}>Price</h5>
                <p>{tutor.price}</p>
                <h5 style={{ marginTop: "38px" }}>Distance km/h</h5>
                <p>2</p>
              </div>

              <div className="space vl"></div>

              <div className="space mb-4 col-2">
                <h5 style={{ marginTop: "8px" }}>Language</h5>
                <p className="">
                  <span className="fontSize">English</span>
                </p>
                <h5 style={{ marginTop: "40px" }}>Time</h5>
                <p className="">
                  <span className="fontSize">8:00 AM</span>
                </p>
                <h5 style={{ marginTop: "28px" }}>Date</h5>
                <p className="pFontSize">
                  <span className="fontSize">12-08-2024</span>
                </p>
              </div>
              <div className="space vl"></div>
              <div className="space mb-3 col-2">
                <h5 style={{ marginTop: "8px" }}>Comments</h5>
                <p className="pFontSize">
                  <span className="fontSize">{tutor.comments}</span>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleSideShowProfile();
                    passIndex(index);
                  }}
                >
                  See more
                </button>
              </div>
            </div>
          ))
        ) : (
          // DUMMY DATA START
          // <div
          //   className="dashboard-grid"
          //   style={{ transform: "translateY(30px)" }}
          // >
          //   <div
          //     className="border border-4 rounded text-center p-3 mt-1 box-w"
          //     style={{
          //       width: "100%",
          //       borderRadius: "30px",
          //     }}
          //   >
          <div>
            {dummyData.map((tutor, index) => (
              <div
                key={tutor.id}
                className="box-1000x1000 rounded text-center p-3 mt-3 d-flex justify-content-center flex-direction-row box-w shadow"
                style={{
                  boxShadow: "10px 10px 5px black",
                  width: "100%",
                  position: "relative",
                  top: "30px",
                }}
              >
                <div className="d-inline-block align-bottom">
                  <img
                    src={Flag}
                    width="180"
                    height="180"
                    alt="Flag"
                    className="mb-3"
                    style={{
                      boxShadow: "10px 10px 5px grey",
                      borderRadius: "10%",
                    }}
                  />
                  <input
                    type="text"
                    className="form-control border rounded text-center bg-info text-light mb-2 mt-4 "
                    readOnly
                    value={tutor.s_address}
                  />
                  <Buttons
                    text="Accept Request"
                    onClick={() => handleClick(data)}
                  />
                </div>

                <div className="space mb-4">
                  <h5
                    style={{
                      marginTop: "8px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tutor.s_fname} {tutor.s_lname}
                  </h5>
                  <p style={{ marginTop: "8px" }} className="fs-5">
                    {tutor.s_gender}{" "}
                  </p>
                  <p className="ms-50 pFontSize mt-5">Subject</p>
                  <input
                    value={tutor.subject}
                    type="text"
                    className="form-control border rounded text-center bg-info text-light mb-2 w-10"
                    readOnly
                    style={{ marginTop: index === 0 ? "18px" : "0px" }}
                  />
                </div>

                <div className="space vl"></div>
                <div className="space mb-3 fontSize">
                  <h5
                    style={{
                      marginTop: "10px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                    }}
                  >
                    {" "}
                    Class Level
                  </h5>
                  <p>{tutor.class_level} Student</p>
                  <h5
                    style={{
                      marginTop: "38px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                    }}
                  >
                    Price
                  </h5>
                  <p>{tutor.price}</p>
                  <h5
                    style={{
                      marginTop: "38px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Distance km/h
                  </h5>
                  <p>2</p>
                </div>

                <div className="space vl"></div>

                <div className="space mb-4 col-2">
                  <h5
                    style={{
                      marginTop: "8px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                    }}
                  >
                    Language
                  </h5>
                  <p className="">
                    <span className="fontSize">English</span>
                  </p>
                  <h5
                    style={{
                      marginTop: "40px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                    }}
                  >
                    Time
                  </h5>
                  <p className="">
                    <span className="fontSize">8:00 AM</span>
                  </p>
                  <h5
                    style={{
                      marginTop: "28px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                    }}
                  >
                    Date
                  </h5>
                  <p className="pFontSize">
                    <span className="fontSize">12-08-2024</span>
                  </p>
                </div>
                <div className="space vl"></div>
                <div className="space mb-3 col-2">
                  <h5
                    style={{
                      marginTop: "8px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                      fontFamily: "Georgia, serif",
                      fontSize: "25px",
                    }}
                  >
                    Comments
                  </h5>
                  <p className="pFontSize">
                    <span className="fontSize">{tutor.comments}</span>
                  </p>
                  <button
                    className="btn btn-primary tchrReqSeeMr"
                    onClick={() => {
                      handleSideShowProfile();
                      passIndex(index);
                    }}
                  >
                    See more
                  </button>
                </div>
              </div>
            ))}
          </div>
          // DUMMY DATA END

          // <p style={{ marginTop: "50px", fontFamily: "Georgia, serif" }}>
          //   No data available
          // </p>
        )}

        <div>
          <Offcanvas
            show={showMore}
            onHide={handleSideProfile}
            className="canvas-w w-25"
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
              <div className="space d-flex flex-direction-row">
                <img
                  src={Flag}
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
                  <h5 className="mt-3">
                    {individual.s_fname}&nbsp;{individual.s_lname}
                  </h5>
                  <h5 className="text-primary">{individual.class_level}</h5>
                </div>
              </div>
              <>
                <hr />
                <div className="space mb-3 ">
                  <h4 style={{ marginTop: "8px" }}>About</h4>
                  <p className="pFontSize">
                    <span className="fontSize">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt culpa rem laborum eligendi quam soluta dicta
                      explicabo fugit odit autem maiores blanditiis nulla
                      temporibus, laudantium, inventore voluptates! Dicta, ipsa
                      velit. Lorem, ipsum dolor sit amet consectetur adipisicing
                      elit. Deleniti, quisquam placeat voluptatibus expedita
                      soluta tempora exercitationem magnam explicabo porro unde
                      minus facilis architecto nihil est! Consectetur voluptatem
                      voluptates explicabo animi?
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
                  <h5>Request</h5>
                  <br></br>
                  <Buttons
                    text="Accept Request"
                    className="button-show ms-3"
                    onClick={() => {
                      handleClick(data);
                    }}
                  />
                </div>
              </>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </Container>
    </div>
  );
};

export default CenteredInputAndButton;
