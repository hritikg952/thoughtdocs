//! not using this component 

import React from "react";
import "./base.css";

import NavBar from "./NavBar";

import { Container } from "react-bootstrap";
const Base = ({ m_top, children }) => {
  return (
    // <Container fluid>
      <div className="base">
        <NavBar />
        <div style={{ marginTop: m_top }}>{children}</div>
      </div>
    // </Container>
  );
};

export default Base;
