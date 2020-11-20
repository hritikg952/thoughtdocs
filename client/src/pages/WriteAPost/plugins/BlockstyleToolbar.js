import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import HeaderStyleDropdown from "./HeaderStyleDropdown";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

export const BLOCK_TYPES = [
  { label: <FormatQuoteIcon/>, style: "blockquote" },
  { label: <FormatListBulletedIcon />, style: "unordered-list-item" },
  { label: <FormatListNumberedIcon />, style: "ordered-list-item" },
  { label: "{ }", style: "code-block" },
];
export const HEADER_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
];

export function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const BlockstyleToolbar = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const [toggleState, setToggleState] = useState("");

  useEffect(() => {
    onToggle(toggleState);
  }, [toggleState]);

  const changeOnToggle = (e, style) => {
    e.preventDefault();
    setToggleState(style);
  };
  return (
    <div className="blockstyleToolbar">
      <HeaderStyleDropdown
        headerOptions={HEADER_TYPES}
        active={blockType}
        onToggle={onToggle}
      />

      <ToggleButtonGroup
        value={toggleState}
        exclusive
        onChange={changeOnToggle}
      >
        {BLOCK_TYPES.map((type) => {
          return (
            <ToggleButton value={type.style}>{type.label}</ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};

export default BlockstyleToolbar;
