import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ProfilePhoto = ({ name }) => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (name) {
      let initials = "";
      const words = name.split(" ");

      words.forEach((word) => {
        initials += word.charAt(0);
      });

      setInitials(initials);
    }
  }, [name]);

  return (
    <div className="ProfilePhoto">
      <div className="ProfilePhoto-imgWrap">
        <span className="ProfilePhoto-img">{initials}</span>
      </div>
      <h3>{name}</h3>
    </div>
  );
};

ProfilePhoto.propTypes = {
  name: PropTypes.string,
};
