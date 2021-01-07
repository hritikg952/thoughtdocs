import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles, Paper, Grid, TextField, Button } from "@material-ui/core";

import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./WriteAPost.css";
import { isAutheticated } from "../../auth/helper/index";
import { createPost } from "../../helpers/index";
import NavBar from "../../core/navbar/NavBar";
import AlertComponent from "../../components/Alert/AlertComponent";
import CircularLoader from "../../components/loader/CircularLoader";

function WriteAPost() {
  const [authDetails, setAuthDetails] = useState("");
  const [publishLoader, setPublishLoader] = useState(false);
  const [draftLoader, setDraftLoader] = useState(false);
  const [alert, setAlert] = useState({
    alertMessage: "",
    isError: "",
    isSuccess: "",
  });
  const { alertMessage, isError, isSuccess } = alert;
  const [title, setTitle] = useState("");

  useEffect(() => {
    setPublishLoader(false);
    setDraftLoader(false);
    if (isAutheticated()) {
      setAuthDetails(isAutheticated());
    } else {
      setAuthDetails(null);
    }
  }, []);

  const handlePublishDraftPostClick = (e, isPublish) => {
    if (isPublish) {
      setPublishLoader(true);
    } else {
      setDraftLoader(true);
    }
    e.preventDefault();
    if (isAutheticated()) {
      createPost(
        {
          title,
          content: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          published: isPublish,
        },
        authDetails.user._id
      ).then((data) => {
        setPublishLoader(false);
        setDraftLoader(false);
        if (data.status === 200) {
          setAlert({
            alertMessage: "Posted successfully",
            isSuccess: true,
            isError: false,
          });
          setEditorState(EditorState.createEmpty());
          window.localStorage.removeItem("content");
        } else if (data.status >= 400) {
          setAlert({
            alertMessage: JSON.parse(data.response).error,
            isError: true,
            isSuccess: false,
          });
        } else {
          setAlert({
            alertMessage: "Something went wrong! Try Again.",
            isError: true,
            isSuccess: false,
          });
        }
      });
    } else {
      setAlert({
        alertMessage: "Log in to submit a post!",
        isError: true,
        isSuccess: false,
      });
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  }

  const writeapost = () => {
    return (
      <div
        className="write-a-post-container"
        style={{ padding: "100px 10px 10px 10px" }}
      >
        <input
          type="text"
          placeholder="Enter Title..."
          onChange={(e) => handleTitleChange(e)}
        />
        <Editor
          editorState={editorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          onEditorStateChange={onEditorStateChange}
        />
        <div className="button-area">
          <button
            className="button-style"
            onClick={(e) => handlePublishDraftPostClick(e, true)}
          >
            {publishLoader ? <CircularLoader /> : "Pulish"}
          </button>
          <button
            className="button-style"
            style={{ backgroundColor: "#ffd369" }}
            onClick={(e) => handlePublishDraftPostClick(e, false)}
          >
            {draftLoader ? <CircularLoader /> : "Save as Draft"}
          </button>
        </div>
      </div>
    );
  };

  const didRedirect = () => {
    if (authDetails === null) {
      return <Redirect to="/signin" />;
    }
  };

  return (
    <div>
      <NavBar />
      {isError && <AlertComponent message={alertMessage} severity="error" />}
      {isSuccess && (
        <AlertComponent message={alertMessage} severity="success" />
      )}
      {writeapost()}
      {didRedirect()}
    </div>
  );
}

export default WriteAPost;
