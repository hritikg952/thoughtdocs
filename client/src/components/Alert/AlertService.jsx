import AlertComponent from "./AlertComponent";
import React from "react";
export const errorAlert = (message) => {
  return <AlertComponent severity="error" message={message} />;
};

export const successAlert = (message) => {
  return <AlertComponent severity="success" message={message} />;
};
