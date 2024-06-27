import React, { useState } from "react";
import { postSlot, getSelectedSlots } from "../../calls/tutor/tutorTime";
import "./InsertTimeTable.css"; // Import CSS file for styling
import { Button } from "react-bootstrap";

const TimeTable = () => {
  const hours = Array.from({ length: 9 }, (_, i) => i + 9);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedSlotsArray, setSelectedSlotsArray] = useState([]);

  const handleSlotClick = (day, hour) => {
    if (isSlotSelected(day, hour)) {
      return;
    }

    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots };
      if (!newSelectedSlots[day]) {
        newSelectedSlots[day] = [];
      }
      newSelectedSlots[day].push(hour);
      return newSelectedSlots;
    });

    setSelectedSlotsArray((prevSelectedSlotsArray) => {
      const newSelectedSlotsArray = [...prevSelectedSlotsArray, { day, hour }];
      return newSelectedSlotsArray;
    });
  };

  const isSlotSelected = (day, hour) => {
    return selectedSlots[day] && selectedSlots[day].includes(hour);
  };

  const saveSelection = () => {
    postSlot(selectedSlotsArray)
      .then((response) => {
        window.location.href = "/teachers/teacherCompleteProfile";
        setSelectedSlots({});
        setSelectedSlotsArray([]);
      })
      .catch((error) => {
        console.error("Error saving selected slots:", error);
      });
  };

  return (
    <div className="timetable-container tmtbCont insrtTmTl">
      <div className="timetable-card tmtbCrd" style={{ marginTop: "60px" }}>
        <div
          className="border border-secondary mainC1 w-100"
          style={{ padding: "30px" }}
        >
          <div className="card-content">
            <h3
              variant="h4"
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "30px",
                marginTop: "5px",
                color: "#4a4a4a",
              }}
            >
              Upload Your Timetable
            </h3>
            <table className="timetable tmtbl">
              <thead>
                <tr>
                  <th className="empty-col"></th>
                  {hours.map((hour) => (
                    <th key={hour} className="hrKi">{`${hour}:00 - ${
                      hour + 1
                    }:00`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {daysOfWeek.map((day) => (
                  <tr key={day}>
                    <td className="dyOfWk">{day}</td>
                    {hours.map((hour) => (
                      <td
                        key={hour}
                        className={isSlotSelected(day, hour) ? "selected" : ""}
                        onClick={() => handleSlotClick(day, hour)}
                        style={{
                          borderBottom: "1px solid #d47070",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      ></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className="text-white rounder p-2  w-25 adMrBtnInstTm"
                onClick={() => saveSelection()}
              >
                <span>Save Selection</span>
              </Button>{" "}
              &nbsp;&nbsp;&nbsp;
              <Button
                className="text-white rounder p-2  w-25 adMrBtnInstTm"
                onClick={() => {
                  setSelectedSlots({});
                  setSelectedSlotsArray([]);
                }}
              >
                <span>Clear Selection</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
