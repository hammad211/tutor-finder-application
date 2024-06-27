import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch,faAngleUp,faAngleDown,} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";
import Buttons from "./Button/button";
import {Container,InputGroup,FormControl,Button,Card,} from "react-bootstrap";

const MainTable = ({ text, mainButton }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedSearch, setIsCollapsedSearch] = useState(false);

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearchToggle = () => {
    setIsCollapsedSearch(!isCollapsedSearch);
  };
  
  return (
    <>
      <div className="bg-body-tertiary">
        <Container className="d-flex flex-column align-items-center border-4  rounded">
          <div className="d-flex flex-column align-items-center mt-1 rounded border-4 ">
            <div
              className="bg-white text-white rounded text-center p-3 mt-3 box-w"
              style={{
                width: "1500px",
                borderRadius: "30px",
                maxWidth: "2000px",
              }}
            >
              <div className="d-flex flex-inline">
                <h3 className="p-3 text-black d-flex align-self-start">
                  {text}
                </h3>
                <Button
                  className="p-3 mb-3 btn-info d-flex align-self-end text-muted"
                  style={{ marginLeft: "1000px" }}
                >
                  {mainButton}
                </Button>
              </div>

              <Button
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded={isCollapsed}
                aria-controls="collapseExample"
                onClick={handleSearchToggle}
                className="bg-white fs-5 w-100 text-black border-0 p-3 d-flex align-self-start d-inline text-trnasform-none"
              >
                <FontAwesomeIcon className=" ms-3 fs-3" icon={faSearch} />
                <span className="ms-4">Search</span>
              </Button>

              <Collapse in={isCollapsedSearch}>
                <div
                  className="collapse multi-collapse"
                  id="multiCollapseExample1"
                >
                  <Card className="border bg-white d-flex align-self-center rounded text-center p-3 mt-3 vh-50 d-md-block">
                    <Card.Body>
                      <div
                        className="w-50 d-flex align-self-center "
                        style={{ marginLeft: "350px" }}
                      >
                        <InputGroup className="mb-1">
                          <FormControl
                            placeholder="Search..."
                            aria-label="Search..."
                            aria-describedby="basic-addon2"
                            className="p-4 fs-4 col-1 "
                          />
                          <br></br>
                          <Button
                            variant="primary"
                            id="button-addon2"
                            className="btn-lg fs-3 col-2"
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </InputGroup>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Collapse>
              <div>
                <div
                  className=" rounded text-center p-3 mt-3 box-w border rounded-3 bg- text-white  font-grey-bold main-header"
                  style={{ width: "1460px" }}
                >
                  <div class="d-flex justify-content-between font-weight-bold">
                    <div class="col-2 fs-5 ">
                      <span> Date </span>
                    </div>

                    <div class="col-3 fs-5 ">
                      <span> Course Name</span>
                    </div>

                    <div class="col-3 fs-5 ">
                      <span> Price</span>
                    </div>
                    <div class="col-4 fs-5">
                      <span> Request</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className=" rounded text-center p-1 mt-5 box-w border rounded "
                style={{ width: "1460px" }}
              >
                <div className="d-flex justify-content-between  text-black mt-2">
                  <div className="col-2 mt-3  fs-5">
                    <span> 14-12-2023</span>
                  </div>

                  <div class="col-3  mt-3 fs-5 font-weight-large text-muted">
                    <span> maths </span>
                  </div>

                  <div class="col-3  mt-2 fs-5">
                    <button className="button-show mt-2"> 500/pkr</button>
                  </div>
                  <div class="col-2  mt-2 fs-5">
                    <Buttons
                      variant="outline-primary"
                      text="View Requests"
                      className=" w-75 p-4 glow glow-primary"
                    />
                  </div>

                  <div class="col-1  mt-4 fs-5">
                    <Button variant="primary" id="button-addon2">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </div>
                </div>
                <hr className="text-muted mt-5" />

                <div className="d-flex flex-column ">
                  <Collapse in={isCollapsed} direction="up">
                    <div
                      class="collapse multi-collapse"
                      id="multiCollapseExample1"
                    >
                      <div class="d-flex justify-content-between  text-black">
                        <div class="col-4   fs-5">
                          <span>Tutor Name</span>
                          <br></br>
                          <button className="button-show mt-2"> abcdef</button>
                        </div>

                        <div class="col-4  mt-3 fs-5">
                          <span class="text-dark"> Gender</span>
                          <br></br>
                          <button className="button-show mt-2"> Male</button>
                        </div>

                        <div class="col-4  mt-3 fs-5">
                          <span class="text-dark"> Price:</span>
                          <br></br>
                          <button className="button-show mt-2"> 500/pkr</button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between text-black ">
                        <div className="col-4  spacing mt-2  fs-5">
                          <span> Time </span>
                          <br></br>
                          <button className="button-show mt-2"> 8:00 am</button>
                        </div>

                        <div class="col-4  mt-3 fs-5">
                          <span class="text-dark"> Address </span>
                          <br></br>
                          <button className="button-show mt-2">
                            {" "}
                            Johar Town
                          </button>
                        </div>

                        <div className="col-4  mt-4 fs-5">
                          <span class="text-dark"> City </span>
                          <br></br>
                          <button className="button-show mt-2"> Lahore</button>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>

                {isCollapsed === false && (
                  <div className="w-25 px-2 mt-1 d-flex align-self-start mb-3">
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded={isCollapsed}
                      aria-controls="collapseExample"
                      onClick={handleCollapseToggle}
                    >
                      See More &nbsp;
                      <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                  </div>
                )}

                {isCollapsed === true && (
                  <div className="w-25 d-flex mt-5 align-self-start mb-3">
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded={isCollapsed}
                      aria-controls="collapseExample"
                      onClick={handleCollapseToggle}
                    >
                      See Less &nbsp;
                      <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MainTable;
