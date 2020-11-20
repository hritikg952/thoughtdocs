import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";

//? importing custom functions of api and css
import "./WriteAPost.css";
import { createPost } from "../../helpers/index";
import { isAutheticated } from "../../auth/helper/index";

//?importing EDITOR related stuff
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import BlockstyleToolbar, { getBlockStyle } from "./plugins/BlockstyleToolbar";
import BasicStyleToolbar from "./plugins/BasicStyleToolbar";

//?importing MUI related stuff
import { makeStyles, Paper, Grid, TextField, Button } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

//?importing components
import NavBar from "../../core/navbar/NavBar";
import AlertComponent from "../../components/Alert/AlertComponent";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(2),
  },
  paperContainer: {
    padding: theme.spacing(2),
  },
  toolbar: {
    padding: "16px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "black",
  },
}));

function WriteAPost() {
  const classes = useStyles();
  const [authDetails, setAuthDetails] = useState("");
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    alertMessage: "",
    isError: "",
    isSuccess: "",
  });
  const { alertMessage, isError, isSuccess } = alert;
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isAutheticated()) {
      setAuthDetails(isAutheticated());
    } else {
      setAuthDetails(null);
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  //! EDITOR FUNCITONS
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handlePublishPostClick = (e, isPublish) => {
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

  //? useEffect to get editor data from localstorage
  useEffect(() => {
    const rawEditorData = getContentFromLocalStorage();
    if (rawEditorData !== null) {
      const contentState = convertFromRaw(rawEditorData);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  //save content to loacalstorage after every 2 sec
  // const saveContent = debounce((content) => {
  //   window.localStorage.setItem("content", JSON.stringify(content));
  // }, 2000);

  // fetch data from localstorage
  const getContentFromLocalStorage = () => {
    const content = window.localStorage.getItem("content");
    return content ? JSON.parse(content) : null;
  };

  // trigger on evry change in editor
  const onChange = (editorState) => {
    const contentState = convertToRaw(editorState.getCurrentContent());
    // console.log(convertToRaw(contentState));
    // if (contentState.blocks[0].text !== "") {
    //   saveContent(contentState);
    // }
    setEditorState(editorState);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const changeStyle = (style) => {
    const nextState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(nextState);
  };

  const toggleBlockType = (blockType) => {
    const nextState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(nextState);
  };

  //! EDITOR FUNCITONS ends

  const writeapost = () => {
    //? plugins
    const highlightPlugin = createHighlightPlugin();
    const plugins = [highlightPlugin];
    const [basicToolbarToggle, setBasicToolbarToggle] = useState("");
    const onBasicStyleToolbarToggle = (e, style) => {
      e.preventDefault();
      setBasicToolbarToggle(style);
      changeStyle(style);
    };
    const styles = [
      { name: "UNDERLINE", abr: "U" },
      { name: "BOLD", abr: "B" },
      { name: "ITALIC", abr: "I" },
      { name: "STRIKETHROUGH", abr: "Strike" },
      { name: "HIGHLIGHT", abr: "highlight" },
    ];
    return (
      <Grid container justify="center" className={classes.mainContainer}>
        <Grid item lg={9}>
          <Paper elivation={3} className={classes.paperContainer}>
            <Grid container style={{ flexDirection: "column" }} spacing={2}>
              <Grid item lg={10}>
                <TextField
                  fullWidth
                  placeholder="Enter title.."
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e)}
                />
              </Grid>
              <Grid item lg={12}>
                <div className="editorContainer">
                  <div className="toolbar">
                    <BlockstyleToolbar
                      editorState={editorState}
                      onToggle={toggleBlockType}
                    />
                    {/* <BasicStyleToolbar
                      editorState={editorState}
                      onToggle={changeStyle}
                    /> */}
                    <ToggleButtonGroup
                      value={basicToolbarToggle}
                      exclusive
                      onChange={onBasicStyleToolbarToggle}
                    >
                      {styles.map((type) => {
                        return (
                          <ToggleButton value={type.name}>
                            {type.abr}
                          </ToggleButton>
                        );
                      })}
                    </ToggleButtonGroup>
                    {/* <div className="basicToolbar">
                      {styles.map((style) => {
                        return (
                          <button
                            key={style.name}
                            onMouseDown={(e) => changeStyle(e)}
                            name={style.name}
                          >
                            {style.abr}
                          </button>
                        );
                      })}
                    </div> */}
                  </div>
                  <Editor
                    editorState={editorState}
                    onChange={onChange}
                    handleKeyCommand={handleKeyCommand}
                    plugins={plugins}
                    blockStyleFn={getBlockStyle}
                  />
                </div>
              </Grid>
              <Grid item lg={12}>
                <Button
                  onClick={(e) => handlePublishPostClick(e, true)}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Publish
                </Button>
                <Button
                  onClick={(e) => handlePublishPostClick(e, false)}
                  variant="contained"
                  color="primary"
                >
                  Save as Draft
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
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
