import React from "react";

function Tag({ title, isSolve }) {
  return (
    isSolve !== "" && (
      <div
        className={`game-tag ${isSolve ? "green-gradient" : "red-gradient"}`}
      >
        {title}
      </div>
    )
  );
}

export default Tag;
