import React from "react";
import { COLS, ROWS } from "../../utils/Constants";
import useDragAndDrop from "../../hooks/useDragAndDrop";

const GridCells = () => {
    const { onDragEnter, onDragLeave } = useDragAndDrop()
  return (
    <React.Fragment>
      {[...Array(COLS * ROWS).keys()].map(i => (
        <div key={i} onDragEnter={onDragEnter} onDragLeave={onDragLeave} className="grid-cell"></div>
      ))}
    </React.Fragment>
  );
};

export default GridCells;