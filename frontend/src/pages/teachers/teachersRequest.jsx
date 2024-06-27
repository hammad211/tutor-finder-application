import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRequest, updateReq, deleteReq } from '../../calls/requests/res';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import "../../cssFile/teachersREquest.css";
import { postConversation } from '../../calls/chat/mesages';

const TeachersRequest = () => {
  const [requests, setRequests] = React.useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io('http://localhost:5080'));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('getCourse', () => {
        getRequests();
      });
      socket.on('getReq', () => {
        getRequests();
      });
      return () => {
        socket.disconnect();
      };
    }
    return () => { };
  }, [socket]);
  
  const getRequests = () => {
    getRequest()
      .then((res) => {
        setRequests(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postConversations = (sRegId, tRegId) => {
    postConversation(sRegId, tRegId)
      .then((res) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setSocket(io('http://localhost:5080'));
  }, []);

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('getCourse', () => {
        getRequests();
      });
      socket.on('getReq', () => {
        getRequests();
      });
      return () => {
        socket.disconnect();
      };
    }
    return () => { };
  }, [socket]);



  return (
    <>
      <div className='d-flex justify-content-center'>
        <Card
          style={{
            backgroundColor: "#f0f0f0",
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            width: "90rem",
            marginTop: "80px",
          }}
          className="mx-auto"
        >
          <Card.Body>
            <h1>Requests</h1>
            <table className="table styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Student Name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {requests && requests.length > 0 ? (
                  requests.map((item, index) => (
                    <tr key={index}>
                      <td>{item.c_id}</td>
                      <td>{item.course}</td>
                      <td>{item.price}</td>
                      <td>{item.value}</td>
                      <td>{item.s_fname} {item.s_lname}</td>
                      <td>{item.s_address}, {item.s_city}</td>
                      <td>{item.s_gender}</td>
                      <td>{item.status}</td>
                      <td>
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => {
                                updateReq(item.id, 'accept');
                                socket?.emit('getReq', {});
                                postConversations(item.s_reg_id, item.t_reg_id);
                              }}
                              className="btn btn-success mr-2"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => {
                                deleteReq(item.id);
                                getRequests();
                              }}
                              className="btn btn-danger"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {item.status === 'accept' && (
                          <Link to={`../../chats/chat`} className="btn btn-primary">
                            Visit
                          </Link>
                        )}

                        {item.status === 'complete' && (
                          <button>Review</button>
                        )}
                      </td>
                      <td>
                        {item.status === 'accept' && (
                          <button
                            onClick={() => {
                              getRequests();
                              updateReq(item.id, 'complete');
                            }}
                            className="btn btn-success mr-2"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No request exist</td>
                  </tr>
                )}
              </tbody>

            </table>
          </Card.Body>
        </Card>
      </div>


    </>
  );

}

export default TeachersRequest;