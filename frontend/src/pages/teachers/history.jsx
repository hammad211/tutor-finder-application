import React from "react";
import { Table } from "react-bootstrap";
import "../../cssFile/history.css";

const History = () => {
  return (
    <div className="history">
      <h2 style={{ fontFamily: "Georgia, serif", marginLeft: "10px" }}>
        History
      </h2>
      <div className="sessionHistoryClass">
        <h3 style={{ marginBottom: "30px" }}>Session History</h3>
        <Table striped bordered hover className="historyTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Class</th>
              <th>Students</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-01-01</td>
              <td>10:00</td>
              <td>Math</td>
              <td>Ali, Ahmed</td>
              <td>1 hour</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>2024-01-02</td>
              <td>11:00</td>
              <td>Science</td>
              <td>Sara, Fatima</td>
              <td>1 hour</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>2024-01-02</td>
              <td>11:00</td>
              <td>Science</td>
              <td>Sara, Fatima</td>
              <td>1 hour</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>2024-01-02</td>
              <td>11:00</td>
              <td>Science</td>
              <td>Sara, Fatima</td>
              <td>1 hour</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="performanceMetrics">
        <h3>Performance Metrics</h3>
        <p>Average Ratings: 4.5/5</p>
        <p>Number of Sessions Conducted: 50</p>
        <p>Total Hours Tutored: 100</p>
      </div>

      <div className="availabilityHistory">
        <h3>Availability History</h3>
        <Table striped bordered hover className="availabilityTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-01-01</td>
              <td>10:00</td>
              <td>12:00</td>
            </tr>
            <tr>
              <td>2024-01-02</td>
              <td>11:00</td>
              <td>13:00</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="performanceReviews">
        <h3>Performance Reviews</h3>
        <Table striped bordered hover className="performanceTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Student Name</th>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-01-01</td>
              <td>Mathematics</td>
              <td>Ali</td>
              <td>4.5</td>
              <td>Great session, really helped me understand the topic!</td>
            </tr>
            <tr>
              <td>2024-01-02</td>
              <td>Physics</td>
              <td>Sara</td>
              <td>4.7</td>
              <td>Very knowledgeable and patient tutor.</td>
            </tr>
            <tr>
              <td>2024-01-03</td>
              <td>Chemistry</td>
              <td>Ahmed</td>
              <td>4.6</td>
              <td>Excellent tutor, made complex topics easy to understand!</td>
            </tr>
            <tr>
              <td>2024-01-04</td>
              <td>Biology</td>
              <td>Fatima</td>
              <td>4.8</td>
              <td>Very engaging and informative session.</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default History;
