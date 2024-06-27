import React, { useState, useEffect } from "react";
import "./TimeTable.css"; // Import CSS file for styling
import { getSelectedSlots } from "../../calls/tutor/tutorTime"; // Import API calls

const TimeTable = () => {
  const [selectedSlots, setSelectedSlots] = useState({});

  useEffect(() => {
    fetchSelectedSlots();
  }, []);

  const fetchSelectedSlots = () => {
    getSelectedSlots()
      .then((response) => {
        setSelectedSlots(response.data.selectedSlots);
      })
      .catch((error) => {
        console.error("Error fetching selected time slots:", error);
      });
  };

  const handleSlotClick = (day, hour) => {
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots };
      if (!newSelectedSlots[day]) {
        newSelectedSlots[day] = [];
      }
      const index = newSelectedSlots[day].indexOf(hour);
      if (index === -1) {
        newSelectedSlots[day].push(hour);
      } else {
        newSelectedSlots[day].splice(index, 1);
      }
      return newSelectedSlots;
    });
  };

  const isSlotSelected = (day, hour) => {
    return selectedSlots[day] && selectedSlots[day].includes(hour);
  };

  const sortedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div>
      <h3
        className="text-center mt-5 mdQuUpldTm3"
        variant="h4"
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "50px",
          marginTop: "20px",
        }}
        gutterBottom
      >
        Uploaded Timetable
      </h3>

      <div className="timetable-container mdQutmtblCot3">
        <table className="timetable tmtbl">
          <thead>
            <tr>
              <th className="empty-col"></th>
              {Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => (
                <th key={hour} className="hrKi">{`${hour}:00 - ${
                  hour + 1
                }:00`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedDays.map((day) => (
              <tr key={day}>
                <td className="dyOfWk">{day}</td>
                {Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => {
                  const isSelected = isSlotSelected(day, hour);
                  const matchedSlot =
                    Array.isArray(selectedSlots[day]) &&
                    selectedSlots[day].find((slot) => slot.start_hour === hour);
                  let className = "";
                  if (
                    isSelected ||
                    (matchedSlot && matchedSlot.value === "true")
                  ) {
                    className = "accepted";
                  } else if (
                    isSelected ||
                    (matchedSlot && matchedSlot.value === "false")
                  ) {
                    className = "selected";
                  }
                  return (
                    <td
                      key={hour}
                      className={className}
                      onClick={() => handleSlotClick(day, hour)}
                      style={{
                        borderBottom: "1px solid #d47070",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
