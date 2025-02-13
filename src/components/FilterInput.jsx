import React, { useState } from "react";
import PropTypes from "prop-types";

const FilterInput = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter || "");

  const handleSearch = () => {
    setGlobalFilter(value);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: "8px", width: "200px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "8px 12px", marginLeft: "10px" }}
      >
        Search
      </button>
    </div>
  );
};

FilterInput.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};

export default FilterInput;
