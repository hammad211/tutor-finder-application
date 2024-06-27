import React, { useState } from "react";
import "../../cssFile/studentDashboard.css";
import Buttons from "../../components/Button/button";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Tutor1 from "../../img/tutor1.png";
import Tutor2 from "../../img/tutor2.png";
import Tutor3 from "../../img/tutor3.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const data = [
    { date: "24-3-2024", course: "Maths", distance: "5km", status: "Pending" },
    {
      date: "25-3-2024",
      course: "Science",
      distance: "8km",
      status: "Approved",
    },
    {
      date: "26-3-2024",
      course: "History",
      distance: "3km",
      status: "Pending",
    },
    {
      date: "27-3-2024",
      course: "English",
      distance: "6km",
      status: "Approved",
    },
    {
      date: "28-3-2024",
      course: "Physics",
      distance: "4km",
      status: "Pending",
    },
  ];

  const tutors = [
    {
      id: 1,
      name: "abcdef",
      time: "8:00 am",
      gender: "Male",
      address: "Johar Town",
      price: "500/pkr",
      city: "Lahore",
      image: Tutor1,
    },
    {
      id: 2,
      name: "abcdef",
      time: "8:00 am",
      gender: "Male",
      address: "Johar Town",
      price: "500/pkr",
      city: "Lahore",
      image: Tutor2,
    },
    {
      id: 3,
      name: "abcdef",
      time: "8:00 am",
      gender: "Male",
      address: "Johar Town",
      price: "500/pkr",
      city: "Lahore",
      image: Tutor3,
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-body-tertiary" style={{ height: "100%" }}>
        <br></br>
        <br></br>
        <div className="top-ml d-flex historyTopHead">
          <h1
            className=" fs-9 font-weight-bold d-inline dashboard-left text-secondary historyH1"
            style={{ marginLeft: "47px" }}
          >
            History
          </h1>
          <div
            className="button-space d-flex flex-direction-row w-50 historyBtn"
            style={{ fontFamily: "Georgia, serif", marginRight: "80px" }}
          >
            <Buttons
              // className=" w-75 p-2 button-show mt-2 text-myTextColor"
              // variant="outline-light"
              // className="ms-2 w-75 p-2 align-self-end bg-primary button-show mt-2 text-myTextColor"
              text="Dashboard"
              className="w-75 ms-2 p-2 align-self-end button-show mt-2 text-myTextColor"
              size="lg"
              onClick={() => {
                navigate("/student/searchScreen");
              }}
            />
            <Buttons
              // variant="outline-light"
              // className="ms-2 w-75 p-2 align-self-end bg-primary button-show mt-2 text-myTextColor"
              text="Pending"
              className="w-75 ms-2 p-2 align-self-end button-show mt-2 text-myTextColor"
              size="lg"
              onClick={() => {
                navigate("/student/pendingQuery");
              }}
            />
          </div>
        </div>

        <Container className="d-flex flex-column align-items-center border-4 rounded">
          <div className="d-flex flex-column align-items-center mt-1 rounded border-4 ">
            <div
              className="border border-4 bg-white text-white rounded text-center p-3 mt-3 box-w"
              style={{ width: "1400px", borderRadius: "30px" }}
            >
              <h3 className="p-3 text-black">History Table</h3>
              <div>
                <Container className="d-flex flex-column align-items-center bg-white rounded">
                  {/* <Card className="w-75"> */}
                  <Card.Body className="w-50">
                    <InputGroup className="">
                      <FormControl
                        placeholder="Search..."
                        aria-label="Search..."
                        aria-describedby="basic-addon2"
                        className="p-4 searchBorder"
                        style={{ borderColor: "#c8c9c9" }}
                      />
                      <Button
                        variant="outline-warning"
                        id="button-addon2"
                        className="bg-myColor text-myTextColor"
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                    </InputGroup>
                  </Card.Body>
                  {/* </Card> */}

                  <br></br>
                </Container>
              </div>
              <div>
                <div
                  className=" rounded text-center p-3 mt-3 box-w border rounded-3 text-black purple-300 font-grey-bold"
                  style={{ width: "1360px" }}
                >
                  <div
                    className="d-flex justify-content-between bg-grey "
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    <div className="col-3 fs-3 ">
                      <span>
                        <Buttons
                          className="button-show mt-2 customButtonHist"
                          text={`Requests ${4}`}
                        />
                      </span>
                    </div>
                    <div className="col-3 fs-3 ">
                      <span>
                        <Buttons
                          className="button-show mt-2 customButtonHist"
                          text={`Gender ${"M"}`}
                        />
                      </span>
                    </div>
                    <div className="col-3 fs-3 ">
                      <span>
                        <Buttons
                          className="button-show mt-2 customButtonHist"
                          text={`distance ${"15km"}`}
                        />
                      </span>
                    </div>
                    <div className="col-3 fs-3 ">
                      <span>
                        <Buttons
                          className="button-show mt-2 customButtonHist"
                          text={"See All"}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <>
                {tutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="rounded text-center p-3 mt-3 box-w border rounded"
                    style={{ width: "1460px", fontFamily: "Georgia, serif" }}
                  >
                    <div className="d-flex justify-content-between text-black">
                      <div className="col-2">
                        <img
                          src={tutor.image}
                          alt="Tutor"
                          style={{ marginTop: "24px" }}
                          className="tutor-image"
                        />
                      </div>
                      <div className="col-3 fs-5" style={{ marginTop: "10px" }}>
                        <span>Tutor Name: </span>
                        <button className="button-show mt-2">
                          {tutor.name}
                        </button>
                        <br></br>
                        <span className="pl-4">Time: </span>
                        <button className="button-show mt-2">
                          {tutor.time}
                        </button>
                      </div>
                      <div className="col-3 fs-5" style={{ marginTop: "10px" }}>
                        <span>Gender: </span>
                        <button className="button-show mt-2">
                          {tutor.gender}
                        </button>
                        <br></br>
                        <span className="pl-5">Address: </span>
                        <button className="button-show mt-2">
                          {tutor.address}
                        </button>
                      </div>
                      <div className="col-3 fs-5" style={{ marginTop: "10px" }}>
                        <span>Price: </span>
                        <button className="button-show mt-2">
                          {tutor.price}
                        </button>
                        <br></br>
                        <span>City: </span>
                        <button className="button-show mt-2">
                          {tutor.city}
                        </button>
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "10px" }}>
                        <Buttons
                          className="button-show mt-2  "
                          text="Confirm"
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </> */}

              <>
                <div
                  className="rounded text-center p-3 mt-3 box-w border rounded"
                  style={{ width: "1360px", fontFamily: "Georgia, serif" }}
                >
                  <div className="d-flex justify-content-between headingHist">
                    <div className="col-2">
                      <span>Image</span>
                    </div>
                    <div className="col-1 fs-5">
                      <span>Tutor Name</span>
                    </div>
                    <div className="col-1 fs-5">
                      <span>Time</span>
                    </div>
                    <div className="col-1 fs-5">
                      <span>Gender</span>
                    </div>
                    <div className="col-1 fs-5">
                      <span>Address</span>
                    </div>
                    <div className="col-1 fs-5">
                      <span>Price</span>
                    </div>
                    <div className="col-1 fs-5">
                      <span>City</span>
                    </div>
                    <div className="col-1">
                      <span>Action</span>
                    </div>
                  </div>
                  {tutors.map((tutor) => (
                    <div
                      key={tutor.id}
                      className="d-flex justify-content-between text-black headingHist"
                    >
                      <div className="col-2">
                        <img
                          src={tutor.image}
                          alt="Tutor"
                          style={{ marginTop: "24px" }}
                          className="tutor-image tutorImgHist"
                        />
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "30px" }}>
                        <button className="button-show mt-2">
                          {tutor.name}
                        </button>
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "30px" }}>
                        <button className="button-show mt-2">
                          {tutor.time}
                        </button>
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "30px" }}>
                        <button className="button-show mt-2">
                          {tutor.gender}
                        </button>
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "30px" }}>
                        <button className="button-show mt-2">
                          {tutor.address}
                        </button>
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "30px" }}>
                        <button className="button-show mt-2">
                          {tutor.price}
                        </button>
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "30px" }}>
                        <button className="button-show mt-2">
                          {tutor.city}
                        </button>
                      </div>
                      <div className="col-1 fs-5" style={{ marginTop: "38px" }}>
                        <Buttons
                          className="button-show mt-2 confirmHist"
                          text="Confirm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            </div>
          </div>

          {/* <div
            className="d-flex flex-column align-items-center mt-5 rounded"
            style={{ width: "800px", height: "1000px" }}
          >
            <h3>History </h3>
            <div className=" border bg-secondary text-white border-primary rounded text-center p-3 mt-3 d-flex  flex-direction-row box-w">
              <th className="th">Date</th>
              <th className="th">Request Course</th>
              <th className="th">Distance</th>
              <th className="th">Status</th>
            </div>

            <div className=" border border-primary rounded text-center p-3 mt-3  box-w">
              <div className="d-flex  flex-direction-row">
                <Buttons className="th bg-white text-black" text="24-3-2024" />
                <Buttons className="b-space bg-white text-black" text="Maths" />
                <Buttons className="b-space bg-white text-black" text="5km" />
                <Buttons
                  className="b-space bg-white text-black"
                  text="Completed"
                />
                <Buttons
                  className="b-space bg-white text-black"
                  text=" Reviewed"
                />
              </div>
              <br></br>
              <hr />

              <div className="mt-3 d-flex flex-direction-column">
                <h4 className="spacing">
                  Tutor Name: <Buttons text="abcdef" disbaled />
                </h4>

                <h4 className="spacing">
                  Location: <Buttons text="Johar Town" disbaled />
                </h4>
              </div>

              <div className="mt-3 d-flex flex-direction-column">
                <h4 className="spacing">
                  Tutor Name:{" "}
                  <Buttons className="btn-success" text="abcdef" disbaled />
                </h4>

                <h4 className="spacing">
                  City:{" "}
                  <Buttons className="btn-success" text="Lahore" disbaled />
                </h4>
              </div>

              <div className="mt-3 d-flex flex-direction-column">
                <h4 className="spacing">
                  Gender:{" "}
                  <Buttons className="btn-primary" text="Male" disbaled />
                </h4>

                <h4 className="spacing-btn-space">
                  Time:{" "}
                  <Buttons className="btn-primary" text=" 8 pm " disbaled />
                </h4>
              </div>

              <div className="mt-3 d-flex flex-direction-column">
                <h4 className="spacing">
                  Price:{" "}
                  <Buttons className="btn-warning" text="500/pkr" disbaled />
                </h4>
              </div>
            </div>
          </div> */}

          <hr />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
