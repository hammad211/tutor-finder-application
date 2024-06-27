import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Buttons from "../Button/button";
import User from "../../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { postImage } from "../../calls/image/img";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./image.css";

const Image = ({ onImageUpload, value, valueImg, data, data1 }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [callback] = useState(valueImg);
  const [imageUpdate, setimageUpdate] = useState("");

  useEffect(() => {
    setimageUpdate(data1);
  }, [data1]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setimageUpdate("");
      setSelectedFile(file);
      if (callback === true) {
        onImageUpload(file);
      }
    } else {
      alert("Please select a valid JPEG or PNG image.");
    }
  };

  const handleAddImageButtonClick = () => {
    document.getElementById("image-upload-input").click();
  };

  const handleSaveImageButtonClick = async () => {
    if (selectedFile) {
      try {
        const base64Image = await convertImageToBase64(selectedFile);
        const response = await postImage(base64Image);
        if (response) {
          navigate("/home");
        } else {
          console.error("Error saving image in the database.");
        }
      } catch (error) {
        console.error("Error saving image in the database:", error);
      }
    } else {
      alert("Please select an image before saving.");
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      const header = document.querySelector(".cstmHed1");
      if (header) {
        header.style.animation = "slideUpFadeIn1 1s ease-out forwards";
        header.style.visibility = "visible";
      }
    }, 0);

    setTimeout(() => {
      const imgTxt = document.querySelector(".imgTxtProTech");
      if (imgTxt) {
        imgTxt.style.animation = "slideUpFadeIn2 1s ease-out forwards";
        imgTxt.style.visibility = "visible";
      }
    }, 1000); // 1 second delay

    setTimeout(() => {
      const btnStd = document.querySelector(".imgBtnStd");
      if (btnStd) {
        btnStd.style.animation = "slideUpFadeIn3 1s ease-out forwards";
        btnStd.style.visibility = "visible";
      }
    }, 2000); // 2 seconds delay
  }, []);

  return (
    <>
      <Container
        maxWidth="md"
        className="mainC mdQumanC mdQumanC3"
        style={{ height: "460px", marginTop: "95px" }}
      >
        <div
          style={{ height: "420px" }}
          className={`mainC1 border-black contain ${
            selectedFile ? "" : "no-image"
          }`}
        >
          <Typography
            variant="h4"
            gutterBottom
            class="cstmHed1 prIm mdQudegreImg3"
            style={{
              marginLeft: "40px",
              marginTop: "60px",
            }}
          >
            {data}
          </Typography>

          <Grid container spacing={4} className="d-flex flex-direction-column">
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              className="rounded border-dark mdQuadQualDgr3"
            >
              {imageUpdate !== "" && (
                <img
                  src={imageUpdate}
                  className="imge size image animIm"
                  // alt="Preview"
                />
              )}

              {!imageUpdate && (
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : User}
                  className="imge size image imgProTech animIm"
                  // alt="Preview"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={11} md={4} className="file-margin">
              <div className="d-inline ">
                <FontAwesomeIcon
                  className="icnProTech mdQuicnPrTch mdQuicnPrTch3"
                  icon={faImage}
                  style={{
                    marginLeft: "335px",
                    marginTop: "210px",
                    padding: "10px",
                  }}
                  onClick={handleAddImageButtonClick}
                />
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  id="image-upload-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <Typography variant="body2" color="purple">
                <p className="text imgTxtProTech uplIm prImg mdQuprImg3">
                  Only upload JPEG or PNG images.
                </p>
              </Typography>
              {value === false ? (
                ""
              ) : (
                <Button
                  className="imgBtnStd w-75  adMrBtnImg uplIm prImg"
                  // size="bg p-2 w-25"
                  onClick={handleSaveImageButtonClick}
                >
                  <span>Save Image</span>
                </Button>
              )}

              {/* <Typography variant="body2" color="purple">
                <p className="text imgTxtProTech">
                  Only upload JPEG or PNG images.
                </p>
              </Typography> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Image;
