import React from "react";

const Tile = ({ number, onClick }) => {
  return (
    <div className={`grid-item grid-item-${number}`} onClick={onClick}>
      {number !== 16 ? number : ""}
    </div>
  );
};

export default Tile;
