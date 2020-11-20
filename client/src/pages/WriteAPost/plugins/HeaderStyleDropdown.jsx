import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

function HeaderStyleDropdown({ headerOptions, active, onToggle }) {
  const changeOnToggle = (event) => {
    let value = event.target.value;
    onToggle(value);
  };
  return (
    <div style={{minWidth: "150px",marginRight: "10px"}}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="header-level">Header Levels</InputLabel>
        <Select
          native
          value={active}
          onChange={(e) => changeOnToggle(e)}
          label="Header Levels"
          inputProps={{
            name: "header-level",
            id: "header-level",
          }}
        >
          <option value=""/>
          {headerOptions.map((heading, index) => {
            return (
              <option key={index} value={heading.style}>
                {heading.label}
              </option>
            );
          })}
        </Select>
      </FormControl>
      {/* <select
        className="blockstyleToolbarSelect"
        value={active}
        onChange={(e) => changeOnToggle(e)}
      >
        <option value="">Header Levels</option>
        {headerOptions.map((heading, index) => {
          return (
            <option key={index} value={heading.style}>
              {heading.label}
            </option>
          );
        })}
      </select> */}
    </div>
  );
}

export default HeaderStyleDropdown;
