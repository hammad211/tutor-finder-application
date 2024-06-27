import React from "react";
import MainTable from "../../components/mainTable";
import Header from "../../components/header";
import Footer from "../../components/footer";
const Requests = () => {
  return (
    <>
      <div className="bg-body-tertiary " style={{ height: "1100px" }}>
        <Header text="Requests" button1="Find a Tutor" />
        <br></br>
        <br></br>
        <MainTable text="Requests" mainButton="view all" />
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Requests;
