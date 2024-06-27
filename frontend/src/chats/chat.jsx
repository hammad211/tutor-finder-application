import React, { useState, useEffect, useRef } from "react";
import userImage from "../img/flag.jpeg";
import { Row, Col, Form, Button } from "react-bootstrap";
import {
  getConversation,
  getMessages,
  postMessage,
} from "../calls/chat/mesages";
import "../cssFile/chat.css";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faPaperclip,
  faCamera,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Type from "../components/Typing/Typing";
const ChatDashboard = () => {
  const [users] = useState(JSON.parse(localStorage.getItem("user")));
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedId, setId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageContainerRef = useRef(null);
  const timestamp = new Date();
  const [receiver, setReceiverId] = useState("");
  const messageTime = new Date(timestamp);
  const formattedDate = messageTime.toLocaleDateString();
  const formattedTime = messageTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const fetchConversations = async () => {
    try {
      const res = await getConversation(users?.id);
      console.log();
      setConversations(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async (conversation_id, receiverId) => {
    try {
      setReceiverId(receiverId);
      setId(conversation_id);
      console.log(conversation_id);
      const res = await getMessages(conversation_id);
      setMessages(res);
      setSelectedConversation(true);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const conversationId = messages[0]?.conversation_id;
      const receiverId = receiver;
      console.log("receiverId", receiver);

      if (message.trim() === "") {
        return; // Don't send empty messages
      }

      // Post the message to the backend
      await postMessage(
        conversationId,
        users.id,
        message,
        receiver,
        formattedTime,
        formattedDate
      );

      // Emit the message via socket if available
      if (socket) {
        socket.emit("sendMessage", {
          conversationId,
          senderId: users.id,
          message,
          receiverId,
          formattedTime,
          formattedDate,
        });
      }

      // Add the message to the messages state after sending
      // const newMessage = {
      //   user: { receive: receiverId },
      //   message,
      //   time: formattedTime,
      //   date: formattedDate,
      //   isNewMessage: true,
      // };
      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {}, [receiver, selectedId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selectedConversation && selectedConversation.conversation_id) {
          const res = await getMessages(selectedConversation.conversation_id);
          console.log("usefff", res);
          setMessages(res);
          setMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    setSocket(io("http://localhost:5080"));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", users?.id);
      socket.on("fetch", () => {
        fetchMessages();
      });

      socket.on("newMessage", (data) => {
        console.log("New message data:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            user: { receive: data.receiverId },
            id: data.id, // Assuming message has a unique ID
            senderId: data.senderId,
            message: data.message,
            time: data.formattedTime,
            date: data.formattedDate,
          },
        ]);
      });

      return () => {
        socket.off("fetch");
        socket.off("newMessage");
      };
    }
  }, [socket, users, messages]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="" style={{ position: "relative" }}>
      <Row className=" w-100 h-100">
        <Col xs={6} className="border w-25 mdQuAcntCht">
          <div className="d-flex align-items-start chatUprCont">
            <div className="mr-3 chatMainPro mdQuchatMainPro">
              <img
                src={userImage}
                height={75}
                width={75}
                alt="User"
                className="chatProfile"
              />
            </div>
            <div className="">
              <Form>
                <Form.Group className="mb-0">
                  <Form.Label className="chatProName">My Account</Form.Label>
                </Form.Group>
                {/* <Form.Group className="mt-0 mb-1">
                  <Form.Label className="chatUndName">Subject</Form.Label>
                </Form.Group> */}
                <Form.Group>
                  <Form.Label className="chatMyNmLf">{users?.name}</Form.Label>{" "}
                  {/* <br></br> */}
                  <Form.Label className="chatMyNmRt">{users?.email}</Form.Label>
                </Form.Group>
              </Form>
            </div>
          </div>

          <hr />

          <div className="d-flex align-items-center px-2 ">
            <div className="px-4 py-10 w-100">
              {conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <div
                    className="clickable-div"
                    key={conversation.conversationId}
                    onClick={() =>
                      fetchMessages(
                        conversation?.conversation_id,
                        conversation?.user_id
                      )
                    }
                  >
                    <Form className="chatMyUniqForm mdQuchatMyUniqForm">
                      <Form.Group>
                        <div className="d-flex flex-row w-25">
                          <div className="rounded-circle mdQuNechImg">
                            <img
                              src={userImage}
                              height={70}
                              width={30}
                              alt="User"
                              className="chatImgName"
                            />
                          </div>
                          <div
                            className=" "
                            style={{ marginLeft: "20px", marginTop: "10px" }}
                          >
                            <Form.Label className="text-2xl">
                              {conversation?.name}
                            </Form.Label>{" "}
                            <Form.Label className="textEml">
                              {conversation?.email}
                            </Form.Label>
                          </div>
                        </div>
                      </Form.Group>
                    </Form>
                    <br />
                  </div>
                ))
              ) : (
                <div
                  className="text-center text-lg font-weight-bold mt-5 chatConver"
                  style={{ height: "320px" }}
                >
                  No conversation
                </div>
              )}
            </div>
          </div>
        </Col>

        {selectedConversation === true ? (
          <Col className="border mdQuMvRght">
            <div
              className="d-flex align-items-center py-3 px-5 bg-white mdQuOnl"
              style={{ borderRadius: "30px", padding: "18px" }}
            >
              <div className="rounded-circle mainBgDp mdQumainBgDp">
                <img
                  src={userImage}
                  height={60}
                  width={60}
                  alt="User"
                  className="chatMainBgDp"
                />
              </div>
              <div className="px-4 py-10 mt-8">
                <Form>
                  <Form.Group>
                    <Form.Label
                      style={{
                        fontWeight: "bold",
                        position: "relative",
                        top: "5px",
                        fontFamily: "Georgia, serif",
                        marginTop: "20px",
                      }}
                    >
                      {conversations[selectedId]?.name}
                    </Form.Label>{" "}
                    <br />
                    <Form.Label
                      style={{
                        fontFamily: "Georgia, serif",
                        marginLeft: "-10px",
                      }}
                    >
                      Online
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <hr />

            {Array.isArray(messages) && messages.length > 0 ? (
              <>
                <div
                  className="mdChtMsg"
                  ref={messageContainerRef}
                  style={{ height: "65vh", overflow: "auto" }}
                >
                  {messages.map(
                    ({ message, user, isNewMessage, time }, index) => {
                      const uniqueKey = isNewMessage
                        ? `new_${index}`
                        : `existing_${index}`;

                      if (index === 0 && message === "") {
                        return null;
                      } else {
                        return (
                          <div key={uniqueKey} className={`p-2 mb-1`}>
                            <div
                              className={`${
                                user?.receive === users?.id
                                  ? "chatMsgBgClr text-white message left-message"
                                  : "chatMsgBgClr text-white message right-message"
                              } `}
                              style={{
                                minWidth: "100px",
                                maxWidth: `${Math.max(
                                  100,
                                  message.length * 10
                                )}px`,
                              }}
                            >
                              <div>{message}</div>
                              <div>{time}</div>
                            </div>
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  className="text-center text-lg font-weight-bold mt-5"
                  style={{
                    position: "relative",
                    top: "140px",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  No messages
                </div>
              </>
            )}

            <div
              className="d-flex align-items-center py-3 px-5 chatInputContainer"
              style={{ borderRadius: "30px" }}
            >
              <div
                className="px-4 py-10  d-flex chatInputWrapper"
                style={{ width: "100%" }}
              >
                <Form
                  className="text-right chatInputForm"
                  style={{ width: "100%" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (message.trim() !== "") {
                      sendMessage();
                      setSelectedConversation(true);
                    }
                  }}
                >
                  <div className="d-flex chatInputField">
                    <Button variant="secondary" className="chatIconButton">
                      <FontAwesomeIcon icon={faSmile} />
                    </Button>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter message"
                      value={message}
                      multiline={true}
                      className="chatMsgCont"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && message.trim() !== "") {
                          e.preventDefault();
                          sendMessage();
                          setSelectedConversation(true);
                        }
                      }}
                    />
                    <Button variant="secondary" className="chatIconButton1">
                      <FontAwesomeIcon icon={faPaperclip} />
                    </Button>
                    <Button
                      variant="secondary"
                      className="chatIconButton1"
                      style={{ marginRight: "5px" }}
                    >
                      <FontAwesomeIcon icon={faCamera} />
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="chatSendButton"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default ChatDashboard;
