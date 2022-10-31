import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { RepeatIcon } from "./icons";

export const Progress = ({ num, max }) => {
  const progress = {
    width: `${(num / max) * 100}%`,
  };

  return (
    <div>
      <div className="progress-meta">
        <RepeatIcon />
        <span>
          {num}/{max}
        </span>
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={progress}
          aria-valuenow={`${num}`}
          aria-valuemin="0"
          aria-valuemax={`${max}`}
        ></div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  num: PropTypes.number,
};
