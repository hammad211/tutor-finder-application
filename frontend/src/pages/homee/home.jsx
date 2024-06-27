import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Process1 from "../../img/ourprocess1.png";
import Process2 from "../../img/ourprocess2.png";
import Process3 from "../../img/ourprocess3.jpg";
import { Button, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBookOpen,
  faChalkboardTeacher,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { getReview } from "../../calls/admin/review";
import subjectsData from "./subjects";
import { UseUserInfos } from "../../context/userInfo";

const Home = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState([]);
  const {  userInfo } = UseUserInfos();

  

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await getReview();
        setReview(response);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const heading1 = document.querySelector(".custom-heading1");
      if (heading1) {
        heading1.style.animation = "slideUpFadeIn1 1s ease-out forwards";
        heading1.style.visibility = "visible";
      }
    }, 0);

    setTimeout(() => {
      const heading2 = document.querySelector(".custom-heading2");
      if (heading2) {
        heading2.style.animation = "slideUpFadeIn2 1s ease-out forwards";
        heading2.style.visibility = "visible";
      }
    }, 1000); // 1 second delay

    setTimeout(() => {
      const btnHome = document.querySelector(".adMrBtnHm");
      if (btnHome) {
        btnHome.style.animation = "slideUpFadeIn3 1s ease-out forwards";
        btnHome.style.visibility = "visible";
      }
    }, 2000); // 2 seconds delay
  }, []);

  useEffect(() => {
    const animateElements = () => {
      const btnLikeTxt = document.querySelector(".btnLikeTxt");
      if (btnLikeTxt) {
        btnLikeTxt.style.animation = "slideDown 1s ease-out forwards";
        btnLikeTxt.style.visibility = "visible";
      }

      setTimeout(() => {
        const yYouChsU = document.querySelector(".yYouChsU");
        if (yYouChsU) {
          yYouChsU.style.animation = "slideRight 1s ease-out forwards";
          yYouChsU.style.visibility = "visible";
        }
      }, 1000); // 1 second delay

      setTimeout(() => {
        const yYouChsUpara = document.querySelector(".yYouChsUpara");
        if (yYouChsUpara) {
          yYouChsUpara.style.animation = "slideRight 1s ease-out forwards";
          yYouChsUpara.style.visibility = "visible";
        }
      }, 2000); // 2 seconds delay

      setTimeout(() => {
        const adMrBtnHm1 = document.querySelector(".adMrBtnHm1");
        if (adMrBtnHm1) {
          adMrBtnHm1.style.animation = "slideUp 1s ease-out forwards";
          adMrBtnHm1.style.visibility = "visible";
        }
      }, 3000); // 3 seconds delay
    };

    const animateAdditionalElements = () => {
      const frCont1 = document.querySelector(".frCont1");
      if (frCont1) {
        frCont1.style.animation = "slideLeft1 1s ease-out forwards";
        frCont1.style.visibility = "visible";
      }

      setTimeout(() => {
        const frCont3 = document.querySelector(".frCont3");
        if (frCont3) {
          frCont3.style.animation = "slideLeft2 1s ease-out forwards";
          frCont3.style.visibility = "visible";
        }
      }, 1000); // 1 second delay

      setTimeout(() => {
        const frCont2 = document.querySelector(".frCont2");
        if (frCont2) {
          frCont2.style.animation = "slideLeft3 1s ease-out forwards";
          frCont2.style.visibility = "visible";
        }
      }, 2000); // 2 seconds delay

      setTimeout(() => {
        const frCont4 = document.querySelector(".frCont4");
        if (frCont4) {
          frCont4.style.animation = "slideLeft4 1s ease-out forwards";
          frCont4.style.visibility = "visible";
        }
      }, 3000); // 3 seconds delay
    };

    animateElements();
    animateAdditionalElements();
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      const target = document.querySelector(".yChsUs");
      if (target) {
        const rect = target.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          setTimeout(() => {
            const btnLikeTxt = document.querySelector(".btnLikeTxt");
            if (btnLikeTxt) {
              btnLikeTxt.style.animation = "slideDown 1s ease-out forwards";
              btnLikeTxt.style.visibility = "visible";
            }
          }, 0);

          setTimeout(() => {
            const yYouChsU = document.querySelector(".yYouChsU");
            if (yYouChsU) {
              yYouChsU.style.animation = "slideRight 1s ease-out forwards";
              yYouChsU.style.visibility = "visible";
            }
          }, 1000); // 1 second delay

          setTimeout(() => {
            const yYouChsUpara = document.querySelector(".yYouChsUpara");
            if (yYouChsUpara) {
              yYouChsUpara.style.animation = "slideRight 1s ease-out forwards";
              yYouChsUpara.style.visibility = "visible";
            }
          }, 2000); // 2 seconds delay

          setTimeout(() => {
            const adMrBtnHm1 = document.querySelector(".adMrBtnHm1");
            if (adMrBtnHm1) {
              adMrBtnHm1.style.animation = "slideUp 1s ease-out forwards";
              adMrBtnHm1.style.visibility = "visible";
            }
          }, 3000); // 3 seconds delay
        }
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <>
      <div class="page-wrape">
        <div class="position-relative">
          <div class="hero-shape"></div>

          <div class="banner-bg pb-5 pt-md-5 position-relative">
            <div class="container pb-5 pt-md-5">
              <div class="row py-5 justify-content-between align-items-center">
                <div class="col-lg-6 col-md-7 py-5 lrnToBtn">
                  <div class="custom-heading1 mdQuCusHed1 mdQuCusHed13">
                    Learn at Your Pace
                    <br />
                    At Your Place
                  </div>
                  <br />
                  <div class="custom-heading2 mdQuCusHed2 mdQuCusHed23">
                    Learning is just a click away. Dive into a world of
                    knowledge
                    <br />
                    with tutors who are experts in their fields.
                  </div>
                  <br />


                  <Button
  className="adMrBtnHm mdQuadMrBtnHm"
  size="bg p-2 w-25"
  onClick={() => {
    if (userInfo.role === "teacher") {
      navigate("./teachers/teacherDashboard");
    } else if (userInfo.role === "student") {
      navigate("./student/searchScreen");
    }
  }}
>
  <span>
    {userInfo.role === "teacher" ? "Find a Student" : "Find a Tutor"}
  </span>
</Button>


                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="position-relative mdQuPositionRel mdQuPositionRel3"
          style={{
            height: "100vh",
            marginBottom: "450px",
            fontFamily: "Georgia, serif",
          }}
        >
          <div className="container py-5">
            <div className="row pt-5 justify-content-between text-center">
              <div className="col-12">
                <h2
                  style={{
                    color: "yourColor",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "50px",
                    lineHeight: 0.8,
                  }}
                >
                  <hr style={{ width: "40%", margin: "0 10px" }} />{" "}
                  <span
                    className="custom-heading3 mdQuCusHed33"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Choose our Tutors by Subjects
                  </span>
                  <hr style={{ width: "40%", margin: "0 10px" }} />{" "}
                </h2>
                <br />
              </div>

              {subjectsData.map((subject, index) => (
                <div key={index} className="col-md-4 col-lg-4 pb-4 mdQuColMd4">
                  <div
                    className="bg-tutor d-flex flex-column align-items-start sixCont"
                    style={{ height: "100%" }}
                  >
                    <img
                      src={subject.imgSrc}
                      alt={subject.alt}
                      className="subImgHm"
                      style={{ height: "70%", objectFit: "cover" }}
                    />
                    <div
                      className="p-4 d-flex flex-column justify-content-center"
                      style={{ height: "30%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h6
                          className="font-weight-bold mb-0 pt-3 text-left mdQuSbName"
                          style={{
                            fontFamily: "Georgia, serif",
                            marginTop: "-15px",
                          }}
                        >
                          {subject.name}
                        </h6>
                      </div>
                      <p
                        className="text-left mdQuSbDescrip"
                        style={{ marginTop: "30px", marginBottom: "10px" }}
                      >
                        {subject.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-danger adMrBtnHm2"
                onClick={() => {
                  navigate("./student/searchScreen");
                }}
              >
                <span>Find More</span>
              </button>
            </div>
          </div>
        </div>

        <div class="position-relative mdQuPostRel mdQuPostRel3">
          <div class="container pt-5 position-relative mdQuZindex3">
            <div class="row pt-5">
              <div class="col-lg-6 mb-5 yChsUs">
                {/* <h6 class="text-warning mb-3">02. Why us?</h6> */}
                <div class="btnLikeTxt">About Us</div>
                <div class="custom-heading3 yYouChsU mdQuyYouChsU3">
                  Why you choose us?
                </div>
                <p
                  class="mb-5 yYouChsUpara mdQuyYouChsUpara3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Every tutor within our network is not just an expert, but a
                  master in their
                  <br />
                  respective fields. This ensures that you're not just learning,
                  but gaining
                  <br />
                  insights from the best and receiving unparalleled instruction.
                </p>
                
              </div>

              <div
                class="col-lg-6 mb-5"
                style={{ fontFamily: "Georgia, serif" }}
              >
                <div class="row">
                  <div class="col-md-6 mb-5 frCont1 mdQufrCont13">
                    <div class="boxHomeOt">
                      <div class="mb-5 nb">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="rounded-circle d-inline p-3 icn"
                        />
                      </div>
                      <div class="custom-heading5">Individual Approaches</div>
                      <p class="mb-0">
                        Each student has unique learning needs, and our platform
                        ensures personalized tutoring tailored to individual
                        strengths and weaknesses, helping students achieve their
                        academic goals more effectively.
                      </p>
                    </div>
                  </div>

                  <div class="col-md-6 mb-5 frCont2 mdQufrCont23">
                    <div class="boxHomeSf">
                      <div class="mb-5 nb">
                        <FontAwesomeIcon
                          icon={faBookOpen}
                          className="rounded-circle d-inline p-3 icn"
                        />
                      </div>
                      <div class="custom-heading5">Wide Tutoring Offer</div>
                      <p class="mb-0">
                        Our platform offers a wide range of tutoring subjects,
                        from math and science to languages and arts, ensuring
                        that every student can find the right tutor for their
                        specific academic needs.
                      </p>
                    </div>
                  </div>

                  <div class="col-md-6 mb-5 frCont3 mdQufrCont33">
                    <div class="boxHomeOt">
                      <div class="mb-5 nb">
                        <FontAwesomeIcon
                          icon={faChalkboardTeacher}
                          className="rounded-circle d-inline p-3 icn"
                        />
                      </div>
                      <div class="custom-heading5">Qualified Staff</div>
                      <p class="mb-0">
                        Our tutors are highly qualified professionals with
                        extensive teaching experience and strong academic
                        backgrounds, ensuring that students receive the highest
                        quality education and support.
                      </p>
                    </div>
                  </div>

                  <div class="col-md-6 mb-5 frCont4 mdQufrCont43">
                    <div class="boxHomeSf">
                      <div class="mb-5 nb">
                        <FontAwesomeIcon
                          icon={faLaptop}
                          className="rounded-circle d-inline p-3 icn"
                        />
                      </div>
                      <div class="custom-heading5">E-Learning</div>
                      <p class="mb-0">
                        Embrace the flexibility and convenience of online
                        learning with our e-learning platform. Students can
                        connect with tutors from anywhere, making education
                        accessible and adaptable to their schedules.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="right-shape home"></div>
        </div>

        <div class="container py-5">
          <div class="row justify-content-between py-5">
            <div class="col-12 text-center mdQutxtCen">
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "50px",
                  lineHeight: 0.8,
                }}
              >
                <hr style={{ width: "40%", margin: "0 10px" }} />{" "}
                <span
                  class="custom-heading4 mdQuPrcSbTr3"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Process of
                </span>
                <span
                  class="custom-heading4 mdQuPrcSbTr33"
                  style={{
                    whiteSpace: "nowrap",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  Subject-based Tutor Selection
                </span>
                <hr style={{ width: "40%", margin: "0 10px" }} />{" "}
              </h2>
            </div>
           
            <div class="col-12 d-lg-flex">
              <Carousel controls={false}>
                <Carousel.Item interval={3000}>
                  <div className="sldrOne mdQusldrOne mdQusldrOne3">
                    <div className="sldrBg"></div>
                    <img
                      className="d-block w-100 sldrImgf mdQusldrImgf mdQusldrImgf3"
                      src={Process1}
                      alt="First slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <div class="custom-heading5 sldrHed mdQusldrHed mdQusldrHed3">
                      Find a tutor in select category
                    </div>
                    <p className="sldrPara mdQusldrPara mdQusldrPara3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed at risus ac quam vulputate congue
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <div className="sldrOne mdQusldrOne mdQusldrOne3">
                    <div className="sldrBg"></div>
                    <img
                      className="d-block w-100 sldrImgf mdQusldrImgf mdQusldrImgf3"
                      src={Process2}
                      alt="Second slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <div class="custom-heading5 sldrHed mdQusldrHed mdQusldrHed3 mdQuPara2 mdQuPara23">
                      Choose an online lesson or meeting
                    </div>
                    <p className="sldrPara mdQusldrPara mdQusldrPara3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed at risus ac quam vulputate congue.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <div className="sldrOne mdQusldrOne mdQusldrOne3">
                    <div className="sldrBg"></div>
                    <img
                      className="d-block w-100 sldrImgf mdQusldrImgf mdQusldrImgf3"
                      src={Process3}
                      alt="Third slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <div class="custom-heading5 sldrHed mdQusldrHed mdQusldrHed3 mdQuPara3 mdQuPara33">
                      Get knowledge together with the tutor
                    </div>
                    <p className="sldrPara mdQusldrPara mdQusldrPara3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed at risus ac quam vulputate congue.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
            <div class="col-12 text-center">
              {" "}
             
            </div>
          </div>
        </div>
        <div class="position-relative">
          <div class="container pb-5">
            <div class="row">
              <div class="col-12 text-center">
                <h2
                  style={{
                    color: "yourColor",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <hr style={{ width: "40%", margin: "0 10px" }} />{" "}
                  <span
                    class="custom-heading4"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Our Happy Students
                  </span>
                  <hr style={{ width: "40%", margin: "0 10px" }} />{" "}
                </h2>
              </div>
            </div>

            <div class="row hpyStd cntrCntnt">
              {review.map((review, index) => (
                <div key={index} className="col-md-4 mb-5 mrgnTop">
                  <div className="conCntain">
                    <div className="img-radius">
                      <img
                        src={review.ima}
                        alt={`${review.s_fname} ${review.s_lname}`}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="custom-heading5 stdName">
                      {`${review.s_fname} ${review.s_lname}`}
                    </div>
                    <p
                      className="mb-0"
                      style={{
                        textAlign: "center",
                        fontSize: "15px",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}

              <div class="col-md-4 mb-5 mrgnTop">
                <div class="conCntain">
                  <div class="img-radius">
                    <img
                      src="https://annedece.sirv.com/Images/pexels-andrea-piacquadio-839011.jpg"
                      class="rounded-circle"
                    />
                  </div>

                  <div class="custom-heading5 stdName">Richard</div>
                  <p
                    class="mb-0"
                    style={{
                      textAlign: "center",
                      ontSize: "15px",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    Love the user-friendly interface. The website is intuitive
                    and efficient. I was able to find the right tutor in no
                    time. Great site for academic help!
                  </p>
                </div>
              </div>
            </div>

            <div class="shape-four"></div>
          </div>
        </div>
        <div
          class="bg-light"
          style={{
            fontFamily: "Georgia, serif",
            position: "relative",
            zIndex: "1",
          }}
        >
          <div class="container py-5">
            <div class="row pt-5 ftrHmRow mdQuftrHmRow mdQuRw">
              <div class="col-md-6 col-lg-3 mb-5 fotrOneHed mdQufotrOneHed mdQufotrOneHed3">
                <h3
                  class="font-weight-bold mb-4"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Best Tutors
                </h3>
                <p
                  class="semi-bold"
                  style={{ whiteSpace: "nowrap", marginTop: "-10px" }}
                >
                  {" "}
                  The best way to learn from a Tutor, empowering students to
                  <br /> achieve their potential. Your success is our mission,{" "}
                  and we are <br /> committed to providing a learning experience
                  like no other.
                </p>
              </div>
              <div class="col-md-6 col-lg-3 mb-5 fotrScndHed mdQufotrScndHed mdQufotrScndHed3">
                <h6
                  class="mb-4 font-weight-bold"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Georgia, serif",
                    fontSize: "17px",
                  }}
                >
                  Products
                </h6>
                <ul class="list-unstyled bb m-0">
                  <li>
                    <a>For Individuals</a>
                  </li>
                  <li>
                    <a>For Schools</a>
                  </li>
                  <li>
                    <a>For Universities</a>
                  </li>
                  <li>
                    <a>For Businesses</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-6 col-lg-3 mb-5 fotrThrdHed mdQufotrThrdHed mdQufotrThrdHed3">
                <h6
                  class="mb-4 font-weight-bold"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Georgia, serif",
                    fontSize: "17px",
                  }}
                >
                  Company
                </h6>
                <ul class="list-unstyled bb m-0">
                  <li>
                    <a>About Us</a>
                  </li>
                  <li>
                    <a>Blog</a>
                  </li>
                  <li>
                    <a>Press</a>
                  </li>
                  <li>
                    <a>Investors</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-6 col-lg-3 mb-5 fotrFrthHed mdQufotrFrthHed mdQufotrFrthHed3">
                <h6
                  class="mb-4 font-weight-bold"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Georgia, serif",
                    fontSize: "17px",
                  }}
                >
                  Privacy & Terms
                </h6>
                <ul class="list-unstyled bb m-0">
                  <li>
                    <a>Community</a>
                  </li>
                  <li>
                    <a>Privacy</a>
                  </li>
                  <li>
                    <a>Terms</a>
                  </li>
                  <li>
                    <a>Copyright</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="py-3 bgClr">
              <div class="container">
                <p class="m-0 text-center small medium-500">
                  Copyright &copy; Tutoring Hub <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
