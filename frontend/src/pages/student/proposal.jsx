import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "../../cssFile/proposal.css";
import { io } from "socket.io-client";
import Times from "../../components/timeTableStudent/TimeTable";
import DefaultImage from "../../img/user.png";

const Proposal = () => {
  const location = useLocation();
  const [socket, setSocket] = useState(null);
  const { data } = location.state;
  const [proposalData] = useState(data);

  useEffect(() => {
    setSocket(io("http://localhost:5080"));
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          minHeight: "100vh",
          width: "100%",
          marginTop: "40px",
        }}
      >
        <Container>
          <div className="top-ml">
            {/* <div
            key={data.t_reg_id}
            className="box-1000x1000 rounded text-center p-3 mt-3 d-flex justify-content-center flex-direction-row box-w shadow srcCntBlw"
            style={{
              boxShadow: "10px 10px 5px black",
              width: "93%",
              height: "100%",
            }}
          > */}
            <div
              key={data.t_reg_id}
              className="d-flex justify-content-center p-3 mt-3 srcCntBlw"
              style={{
                width: "93%",
                height: "100%",
              }}
            >
              {/* Left Container */}
              <div
                className="left-container text-center p-3 mdQuprpslLf"
                style={{
                  width: "30%",
                  boxShadow: "5px 5px 10px grey",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={data.image_data || DefaultImage}
                  width="160"
                  height="160"
                  alt="Flag"
                  className="mb-3"
                  style={{
                    boxShadow: "10px 10px 5px grey",
                    borderRadius: "10%",
                    marginTop: "10px",
                  }}
                />
                <div className="space mb-3 srchByScrnLf">
                  <p className="fs-4 lF1">
                    {data.t_name} {data.t_lname}
                  </p>
                  <p className="fs-5 lF2">{data.t_gender}</p>
                  <p className="fs-5 lF3tq">{data.t_address}</p>
                </div>
              </div>

              {/* Right Container */}
              <div
                className="right-container p-3 mdQuprpslRt"
                style={{
                  width: "65%",
                  marginLeft: "5%",
                  boxShadow: "5px 5px 10px grey",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="space mb-3 fontSize srchByScrnRt"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p className="fs-5 rT1" style={{ marginTop: "38px" }}>
                      Students Teach
                    </p>
                    <p>2</p>
                  </div>
                  <div className="mdQuSrchRt1">
                    <p
                      className="fs-5 rT1"
                      style={{ marginTop: "38px", marginRight: "150px" }}
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
                    fontFamily: "Georgia, serif",
                  }}
                >
                  <div>
                    <p className="fs-5 lF4p">Ratings</p>
                    <p style={{ fontSize: "18px" }}>
                      {data.rating ? `${data.rating}/5` : "Not available"}
                    </p>
                  </div>

                  <div className="mdQuPrpChr">
                    <p className="fs-5 rT8 rT8q">Charges</p>
                    <p className="rT8i">
                      Price:{" "}
                      <span className="fontSize ms-2">{data.price}/pkr</span>
                    </p>
                  </div>
                </div>

                <div
                  className="space mb-3 col-2"
                  style={{
                    fontFamily: "Georgia, serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="space mb-4 srchByScrnRt3"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="sbjctPrpsl">
                      <p className="fs-5 lF6p">Subject</p>
                      {data.subject && data.subject.startsWith("{") ? (
                        data.subject
                          .slice(1, -1)
                          .split(",")
                          .map((subject, i) => (
                            <input
                              key={i}
                              type="text"
                              // className="form-control border rounded text-center bg-info text-light mb-2 w-10"
                              className="srcScrBstd mb-2  w-50"
                              readOnly
                              value={subject.replace(/"/g, "").trim()} // Replace inverted commas with empty string and trim any leading/trailing spaces
                            />
                          ))
                      ) : (
                        <input
                          type="text"
                          className="srcScrBstdSbjct mb-2 w-100 rT6"
                          readOnly
                          value={data.subject}
                          style={{ marginTop: "18px" }}
                        />
                      )}
                    </div>
                  </div>
                  {/* <div style={{ flex: 1 }}>
                    <p className="fs-5 rT9">About</p>
                    <div
                      className="overflow-ellipsis rT9i"
                      style={{ marginRight: "10px" }}
                    >
                      {data.about}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt culpa rem laborum eligendi quam soluta dicta
                      explicabo fugit odit autem maiores blanditiis nulla
                      temporibus, laudantium, inventore voluptates! Dicta, ipsa
                      velit. fugit odit autem maiores blanditiis nulla
                      temporibus, laudantium, inventore voluptates! Dicta, ipsa
                      velit.
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div style={{ marginTop: "190px" }}>
          <Times id={proposalData.t_reg_id} subject={proposalData.subject} />
        </div>
      </div>
    </>
  );
};

export default Proposal;
