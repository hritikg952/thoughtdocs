import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";

function BasicStyleToolbar({ editorState, onToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const styles = [
    { name: "UNDERLINE", abr: <FormatUnderlinedIcon /> },
    { name: "BOLD", abr: <FormatBoldIcon /> },
    { name: "ITALIC", abr: <FormatItalicIcon /> },
    { name: "STRIKETHROUGH", abr: <FormatStrikethroughIcon /> },
    { name: "HIGHLIGHT", abr: <FormatColorTextIcon /> },
  ];
  const [toggleState, setToggleState] = useState("");

  useEffect(() => {
    onToggle(toggleState);
  }, [toggleState]);

  const changeOnToggle = (e, style) => {
    e.preventDefault();
    setToggleState(style);
  };
  return (
    <div>
      <ToggleButtonGroup
        value={toggleState}
        exclusive
        onChange={changeOnToggle}
      >
        {styles.map((type) => {
          return <ToggleButton value={type.name}>{type.abr}</ToggleButton>;
        })}
      </ToggleButtonGroup>
    </div>
  );
}

export default BasicStyleToolbar;
