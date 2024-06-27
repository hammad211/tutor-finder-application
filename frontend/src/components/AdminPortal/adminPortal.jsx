import React, { useState, useEffect } from "react";
import { Container, Form, Modal, Button, Card, Col, Row } from "react-bootstrap";
import { getPersonalTutor, postPersonalTutor, approveTutor, getResponse } from "../../calls/admin/tutor";
import "./adminPortal.css";

const AdminPortal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalComment, setShowModalComment] = useState(false);
  const [showModalQualifyComment, setShowModalQualifyComment] = useState(false);
  const [showModalQualify, setShowModalQualify] = useState(false);
  const [changes, setChanges] = useState("");
  const [type, setType] = useState("");
  const [pendingTeacher, setPendingTeacher] = useState([]);
  const [approvedTeachers, setApprovedTeachers] = useState([]);
  const [displayApproved, setDisplayApproved] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [response, setResponse] = useState([]);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getPersonalTutor();
      const pending = response.filter(teacher => teacher.approve === 'false');
      const approved = response.filter(teacher => teacher.approve === 'true');
      setPendingTeacher(pending);
      setApprovedTeachers(approved);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApprove = async (index, id) => {
    setSelectedTeacher(index);
    try {
      const res = await getResponse(id);
      setResponse(res);
      console.log(res);
    } catch (error) {
      setResponse("")
      console.error("Error fetching response:", error);
    }
    setShowModal(true);

  };
  

  const handleChange = (event) => {
    setChanges(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (changes === "") {
      return alert("please fill the field");
    } else {
      console.log("changes, pendingTeacher[selectedTeacher]?.t_reg_id, type",changes, pendingTeacher[selectedTeacher]?.t_reg_id, type)
      postPersonalTutor(changes, pendingTeacher[selectedTeacher]?.t_reg_id, type);
      setShowModalComment(false);
      setShowModal(false);
      setShowModalQualify(true);
      setChanges("");
    }
  };

  const handleSubmitQual = (e) => {
    e.preventDefault();
    if (changes === "") {
      return alert("please fill the field");
    } else {
      console.log("changes, pendingTeacher[selectedTeacher]?.t_reg_id, type",changes, pendingTeacher[selectedTeacher]?.t_reg_id, type)
      postPersonalTutor(changes, pendingTeacher[selectedTeacher]?.t_reg_id, type);
      setShowModalComment(false);
      setShowModal(false);
      setShowModalQualify(false);
      setShowModalQualifyComment(false);
      setChanges("");
    }
  };

  const approval = (t_reg_id) => {
    approveTutor(t_reg_id);
    setShowModalComment(false);
    setShowModal(false);
    setShowModalQualify(false);
    setChanges("");
  };

  const handleSubmitQualify = (e) => {
    e.preventDefault();
    if (changes === "") {
      alert("please fill the field");
    }
    setShowModalQualify(false);
    setShowModalQualifyComment(false);
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalCloseQualify = () => setShowModalQualify(false);
  const handleModalCloseComment = () => setShowModalComment(false);
  const handleModalCloseQualifyC = () => setShowModalQualifyComment(false);

  const showApprovedTeachers = () => {
    setDisplayApproved(true);
  };

  const showPendingTeachers = () => {
    setDisplayApproved(false);
  };

  return (
    <div className="admin-portal">
      <div className="gapup">
        <br />
        <h1 className="text-center fs-2">
          Admin Dashboard
        </h1>
      </div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <aside>
              <p>Menu</p>
              <a href="javascript:void(0)" onClick={showApprovedTeachers}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                Approved Teachers
              </a>
              <a href="javascript:void(0)" onClick={showPendingTeachers}>
                <i className="fa fa-laptop" aria-hidden="true"></i>
                Pending Approval
              </a>
              
              
             
            </aside>
            <div className="social">
              <a href="https://www.linkedin.com/in/florin-cornea-b5118057/" target="_blank">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </Col>

          <Col md={9}>
  <Card className="admnCont1">
    <Card.Body>
      <h2 className="text-center mb-4">{displayApproved ? 'Approved Teachers' : 'Teacher Approvals'}</h2>
      <div className="table-container">
        <table className="table table-striped admnTblCon1">
          <thead>
            <tr>
              <th className="admnTh">Image</th>
              <th className="admnTh">Name</th>
              <th className="admnTh">Address</th>
              <th className="admnTh">Approve</th>
            </tr>
          </thead>
          <tbody>
            {displayApproved ? approvedTeachers.map((teacher, index) => (
              <tr key={index} >
                <td className="text-center">
                  <img
                    src={teacher.image_tutor}
                    alt={teacher.name}
                    className="admnTchrImg admnTh"
                    style={{ width: "80px", height: "auto", }}
                  />
                </td>
                <td className="text-center fs-5">{teacher?.t_name} {teacher?.t_lname}</td>
                <td className="text-center fs-5">{teacher?.t_address}</td>
                <td className="text-center">
                  <button className="btn btn-danger rounded">Approved</button>
                </td>
              </tr>
            )) : pendingTeacher.map((teacher, index) => (
              <tr key={index}>
                <td className="text-center">
                  <img
                    src={teacher?.image_tutor}
                    alt={teacher.name}
                    className="admnTchrImg admnTh"
                    style={{ width: "80px", height: "auto" }}
                  />
                </td>
                <td className="text-center fs-5">{teacher?.t_name} {teacher?.t_lname}</td>
                <td className="text-center fs-5">{teacher?.t_address}, {teacher?.city}</td>
                <td className="text-center">
                  {teacher.persona === "false" ||teacher.image === "false" || teacher.qualify === "false" ? (
                 <button className="rounded bg-danger fs-5"> Response Sent</button>
                ):(
                 <button className="admnAprvBtn text-center" onClick={() => handleApprove(index, teacher.t_reg_id)}>Approve</button>

                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card.Body>
  </Card>
</Col>


        </Row>
      </Container>

      {/* Modals */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review the Teacher Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={pendingTeacher[selectedTeacher]?.image_tutor} className="border rounded mb-3" alt="Experience" style={{ width: '20%' }} />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom03">
              <Form.Control type="text" placeholder="Name" className="mt-4" value={`${pendingTeacher[selectedTeacher]?.t_name} ${pendingTeacher[selectedTeacher]?.t_lname}`} readOnly required />
              <Form.Control type="text" placeholder="Gender" className="mt-4" value={pendingTeacher[selectedTeacher]?.t_gender} readOnly required />
              <Form.Control type="text" placeholder="Address" className="mt-4" value={pendingTeacher[selectedTeacher]?.t_address} readOnly required />
              <Form.Control type="text" placeholder="City" className="mt-4" value={pendingTeacher[selectedTeacher]?.t_city} readOnly required />
              <Form.Control type="text" placeholder="Price" className="mt-4" value={pendingTeacher[selectedTeacher]?.price} readOnly required />
              <Form.Control type="text" placeholder="Number" className="mt-4" value={pendingTeacher[selectedTeacher]?.number} readOnly required />
            </Form.Group>

            {response && Array.isArray(response) && response.some(item => item.profilevalue === "profile") ? (
    <Button className="mt-5 bg-white text-black">
        Response Exists
    </Button>
) : (
    <Button className="mt-5" onClick={() => { setShowModalComment(true); setType("profile"); }}>
        Disapprove
    </Button>
)}

            <Button className="ms-5 mt-5" onClick={() => { setShowModal(false); setShowModalQualify(true) }}>Next</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalQualify} onHide={handleModalCloseQualify} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review the Teacher Qualification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={pendingTeacher[selectedTeacher]?.qualify_info_image} className="border rounded mb-3" alt="Experience" style={{ width: '20%' }} />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom03">
              <Form.Control type="text" placeholder="Degree" className="mt-4" value={pendingTeacher[selectedTeacher]?.t_degree} readOnly required />
              <Form.Control type="text" placeholder="Degree Type" className="mt-4" value={pendingTeacher[selectedTeacher]?.t_degreetype} readOnly required />
              <Form.Control type="text" placeholder="Institute" className="mt-4" value={pendingTeacher[selectedTeacher]?.t_institute} readOnly required />
              <Form.Control type="text" placeholder="City" className="mt-4" value={pendingTeacher[selectedTeacher]?.city} readOnly required />
              <Form.Control type="text" placeholder="Years" className="mt-4" value={`${pendingTeacher[selectedTeacher]?.t_degreeyear}-${pendingTeacher[selectedTeacher]?.year_end}`} readOnly required />
            </Form.Group>

                {response && Array.isArray(response) && response.some(item => item.qualifyvalue === "qualify") ? (
            <Button className="mt-5 bg-white text-black">
            Response Exists
            </Button>
            ) : (
            <>
            <Button className="mt-5" onClick={() => { setShowModalComment(true); setType("qualify"); }}>
            Disapprove
            </Button>

            <Button className="ms-5 mt-5" onClick={() => { approval(pendingTeacher[selectedTeacher]?.t_reg_id) }}>Approve</Button>
            </>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalComment} onHide={handleModalCloseComment} centered>
        <Modal.Header closeButton>
          <Modal.Title>Changes Required in Teacher Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom03">
              <Form.Control
                type="text"
                placeholder="Write changes"
                className="mt-4"
                value={changes}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button onClick={handleSubmitQual} className="mt-5">Send Response</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalQualifyComment} onHide={handleModalCloseQualifyC} centered>
        <Modal.Header closeButton>
          <Modal.Title>Changes Required in Teacher Qualification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom03">
              <Form.Control
                type="text"
                placeholder="Write changes regarding qualification"
                className="mt-4"
                value={changes}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button onClick={handleSubmitQualify} className="mt-5">Send Response</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPortal;
