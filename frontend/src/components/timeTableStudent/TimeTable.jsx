import React, { useState, useEffect } from "react";
import "./TimeTable.css";
import { getSelectedSlots, postTimeReq } from "../../calls/student/studentInfo";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const TimeTable = ({ id, subject }) => {
  const hours = Array.from({ length: 9 }, (_, i) => i + 9);
  const navigate = useNavigate();
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedSlotsArray, setSelectedSlotsArray] = useState([]);
  const [showSelectedSlots, setShowSelectedSlots] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDateTime = moment(now).format(
        "dddd, DD-MM-YYYY - HH:mm:ss"
      );
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const today = new Date();
    const updatedDaysOfWeek = getNextWeekDays(today);
    setDaysOfWeek(updatedDaysOfWeek);
  }, []);

  const getNextWeekDays = (currentDate) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const nextWeekDays = [];
    for (let i = 0; i < 7; i++) {
      const nextDayDate = new Date(
        currentDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000
      );
      const formattedDate = moment(nextDayDate).format("dddd, DD-MM-YYYY");
      nextWeekDays.push({
        name: days[nextDayDate.getDay()],
        date: formattedDate,
      });
    }
    return nextWeekDays;
  };

  const handleSlotClick = (day, hour, value) => {
    console.log("Clicked slot:", day, hour, value);
    if (value === "false" || value === false) {
      setSelectedSlotsArray((prevArray) => [...prevArray, { day, hour }]);
    }
  };

  const saveSelection = () => {
    const slotsToSave = selectedSlotsArray.map((slot) => {
      const formattedDate = moment(slot.day.date, "dddd, DD-MM-YYYY").format(
        "DD-MM-YYYY"
      );
      return `${slot.day.name} ${formattedDate} ${slot.hour}:00 - ${
        slot.hour + 1
      }:00`;
    });

    if (slotsToSave.length === 0) {
      toast.error("Slots can't be Empty", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    postTimeReq(slotsToSave, subject, id)
      .then((response) => {
        toast.success("Request Added Successfully", {
          position: toast.POSITION.TOP_LEFT,
        });
        setSelectedSlotsArray([]);
        navigate("/student/searchScreen");
      })
      .catch((error) => {
        toast.error("An Error Occured", {
          position: toast.POSITION.TOP_LEFT,
        });
        console.error("Error saving time slots:", error);
      });
  };

  const fetchSelectedSlots = (id) => {
    getSelectedSlots(id)
      .then((response) => {
        setSelectedSlots(response.data.selectedSlots);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSelectedSlots(id);
  }, [id]);

  // Remove duplicates
  const uniqueSlotsArray = selectedSlotsArray.filter(
    (slot, index, self) =>
      index ===
      self.findIndex(
        (s) => s.day.date === slot.day.date && s.hour === slot.hour
      )
  );

  return (
    <div className="timetable-container d-column mt-6 mrgnTTp">
      <h3 className="mt-3" style={{ fontWeight: "bold" }}>
        {currentDateTime}
      </h3>
      <table className="timetable">
        <thead>
          <tr>
            <th className="empty-col"></th>
            {hours.map((hour) => (
              <th key={hour}>{`${hour}:00 - ${hour + 1}:00`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <tr key={day.name}>
              <td>{` ${day.date}`}</td>
              {hours.map((hour) => {
                const value =
                  selectedSlots[day.name]?.find(
                    (slot) => slot.start_hour === hour
                  )?.value || null;
                const isClickable = value === "false";

                return (
                  <td
                    key={hour}
                    className={
                      value === "false"
                        ? "selected"
                        : value === "true"
                        ? "red"
                        : ""
                    }
                    onClick={
                      isClickable
                        ? () => handleSlotClick(day, hour, value)
                        : undefined
                    }
                  >
                    {hour} - {hour + 1} {/* Display hour range */}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="buttons-container btnCntnrTmm">
        <div className="btnRow1">
          <Button
            className="adMrBtnHm21"
            onClick={() => {
              setShowSelectedSlots(true);
            }}
          >
            <span>Show Selected Slots</span>
          </Button>

          <Button className="adMrBtnHm21" onClick={saveSelection}>
            <span>Save Selection</span>
          </Button>
        </div>
        {showSelectedSlots && (
          <div className="selected-slots">
            <h4 style={{ fontFamily: "Georgia, serif", fontSize: "20px" }}>
              Selected Slots:
            </h4>
            <ul>
              {uniqueSlotsArray.map((slot, index) => (
                <li key={index}>{` ${slot.day.date} ${slot.hour}:00 - ${
                  slot.hour + 1
                }:00`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
