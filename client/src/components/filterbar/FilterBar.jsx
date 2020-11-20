import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./filterBar.css";
function FilterBar() {
  const filterBar = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("feed");

    const handleFilterChange = (e, type) => {
      e.preventDefault();
      setFilter(type);
    };

    useEffect(() => {
      dispatch({
        type: "CHANGE_FILTER",
        payload: {
          option: filter,
        },
      });
    }, [filter]);
    return (
      <div className="filter-container">
        <h2>Posts</h2>
        <ul className="filter-options">
          <li>
            <button

              onClick={(e) => handleFilterChange(e, "feed")}
              className={filter === "feed" ? "active" : ""}
            >
              Feed
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleFilterChange(e, "week")}
              className={filter === "week" ? "active" : ""}
            >
              Week
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleFilterChange(e, "month")}
              className={filter === "month" ? "active" : ""}
            >
              Month
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleFilterChange(e, "year")}
              className={filter === "year" ? "active" : ""}
            >
              Year
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleFilterChange(e, "infinity")}
              className={filter === "infinity" ? "active" : ""}
            >
              Infinity
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleFilterChange(e, "latest")}
              className={filter === "latest" ? "active" : ""}
            >
              Latest
            </button>
          </li>
        </ul>
      </div>
    );
  };

  return <div>{filterBar()}</div>;
}

export default FilterBar;
