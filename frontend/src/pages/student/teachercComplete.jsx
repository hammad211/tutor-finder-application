import React from "react";
import Buttons from "../../components/Button/button";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Tutor1 from "../../img/tutor1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const TutorProfile = () => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="tutorProfile ">
      <div
        className="top-ml d-flex"
        style={{ marginTop: "50px", marginLeft: "60px" }}
      >
        <h1
          className=" fs-9 font-weight-bold d-inline dashboard-left text-secondary"
          style={{ marginLeft: "80px", whiteSpace: "nowrap" }}
        >
          Tutor Profile
        </h1>
        <div
          className="button-space d-flex flex-direction-row w-25"
          style={{ fontFamily: "Georgia, serif", marginRight: "120px" }}
        >
          <Buttons
            variant="outline-warning"
            text="Message Tutor"
            className="ms-2 w-100 p-4 align-self-end bg-myColor text-myTextColor"
            size="lg"
          />
        </div>
      </div>
      <Row
        style={{ marginTop: "20px", marginLeft: "60px", marginRight: "60px" }}
      >
        <Col sm={4}>
          {/* Container 1 */}
          <Container className="tProfileCon1">
            <div className="col-2">
              <img
                src={Tutor1}
                alt="Tutor"
                style={{
                  marginTop: "20px",
                  marginLeft: "-10px",
                  marginBottom: "12px",
                }}
                className="tutor-image"
              />
            </div>
            <h2>Tutor Name</h2>
            <div>
              <p>Subject 1, 2, 3</p>
            </div>
            <div className="buttonTextCon1">Last active about 3 hours ago</div>
            <Button variant="outline-primary" className="buttonCon1">
              Button Text
            </Button>
            <br />
            <div style={{ marginBottom: "20px" }}>
              <Row>
                <Col sm={6} className="text-left longColumn">
                  <p>Active students:</p>
                  <p>Number of lessons:</p>
                  <p>From:</p>
                </Col>
                <Col sm={6} className="text-right">
                  <p id="activeStudents">0</p>
                  <p id="numLessons">0</p>
                  <p id="location">Pakistan</p>
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
              <FontAwesomeIcon icon={faLanguage} /> Languages
            </h2>
            <p style={{ paddingTop: "10px" }}>English</p>
            <p style={{ marginTop: "-5px" }}>Urdu</p>
          </Container>
          {/* Container 3 */}
          <Container
            className="tProfileCon2"
            style={{
              backgroundColor: "#f8f9fa",
              height: "150px",
              margin: "20px auto",
            }}
          >
            <h2>
              <FontAwesomeIcon icon={faDollarSign} /> Tuition Rate
            </h2>
            <p style={{ paddingTop: "10px" }}>Min: Rs. 5,000 / month</p>
            <p style={{ marginTop: "-5px" }}>Max: Rs. 18,000 / month</p>
          </Container>
        </Col>
        <Col sm={8}>
          {/* Container 4 */}
          <Container
            className="tProfileCon4"
            style={{
              backgroundColor: "#f8f9fa",
              height: "200px",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <h2>Mr. John Doe</h2>
            <p>
              Mr. John Doe is a highly experienced Mathematics teacher with over
              5 years of experience in the field. He has a passion for teaching
              and has been recognized for his unique teaching methods that make
              complex concepts easy to understand. He is dedicated to helping
              each of his students achieve their academic goals and continuously
              works to improve his teaching methods.
            </p>
          </Container>
          {/* Container 5 */}
          <Container
            className="tProfileCon5"
            style={{
              backgroundColor: "#f8f9fa",
              minHeight: showMore ? "500px" : "210px",
              margin: "20px auto",
              padding: "20px",
            }}
          >
            <h2>Subjects Teach</h2>
            <div className="subjectCon5">
              <p>Mathematics</p>
              <hr />
            </div>
            <div className="subjectCon5">
              <p>Biology</p>
              <hr />
            </div>
            {showMore && (
              <>
                <div className="subjectCon5">
                  <p>Physics</p>
                  <hr />
                </div>
                <div className="subjectCon5">
                  <p>Chemistry</p>
                  <hr />
                </div>
              </>
            )}
            <div className="buttonContainer5">
              <Button onClick={handleClick}>
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </div>
          </Container>
          {/* Container 6 */}
          <Container className="tProfileCon6">
            <h2>Reviews (0)</h2>
            <div className="dropdown-container6">
              <div>
                <label for="recommendation">Recommendation</label>
                <select name="recommendation" id="recommendation">
                  <option value="all">All</option>
                  <option value="recommended">Recommended</option>
                  <option value="neutral">Neutral</option>
                  <option value="unrecommended">Unrecommended</option>
                </select>
              </div>
              <div>
                <label for="rating">Rating</label>
                <select name="rating" id="rating">
                  <option value="all">All</option>

                  <option value="awesome">{`Awesome ${".".repeat(
                    10
                  )}★5`}</option>
                  <option value="great">{`Great ${".".repeat(17)}★4`}</option>
                  <option value="good">{`Good ${".".repeat(17)}★3`}</option>
                  <option value="ok">{`Ok ${".".repeat(21)}★2`}</option>
                  <option value="awful">{`Awful ${".".repeat(17)}★1`}</option>

                  {/* <option value="awesome">Awesome</option>
                  <option value="great">Great</option>
                  <option value="good">Good</option>
                  <option value="ok">Ok</option>
                  <option value="awful">Awful</option> */}
                </select>
              </div>
              <div>
                <label for="subject">Subject</label>
                <select name="subject" id="subject">
                  <option value="all">All</option>
                </select>
              </div>
            </div>

            {/* <div className="no-reviews">
              <p>There are no reviews yet!</p>
            </div> */}

            <div className="reviews" style={{ width: "100%" }}>
              <div className="review">
                <h5>
                  Student Name <span className="starsCon6">★★★★★</span>
                </h5>{" "}
                <p>
                  This teacher is very knowledgeable and patient. I learned a
                  lot from them.
                </p>{" "}
                <hr />
              </div>
              <div className="review">
                <h5>
                  Student Name <span className="starsCon6">★★★★☆</span>
                </h5>{" "}
                <p>
                  This teacher is very knowledgeable and patient. I learned a
                  lot from them.
                </p>{" "}
                <hr />
              </div>
              <div className="review">
                <h5>
                  Student Name <span className="starsCon6">★★★★☆</span>
                </h5>{" "}
                <p>
                  This teacher is very knowledgeable and patient. I learned a
                  lot from them.
                </p>{" "}
                <hr />
              </div>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default TutorProfile;
