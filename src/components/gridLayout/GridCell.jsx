import React from "react";
import { COLS, ROWS } from "../../utils/Constants";
import useDragAndDrop from "../../hooks/useDragAndDrop";

const GridCells = () => {
    const { onDragEnter, onDragLeave } = useDragAndDrop()
  return (
    <React.Fragment>
      {[...Array(COLS * ROWS).keys()].map(i => (
        <div key={i} aria-label={`grid-cell-${i}`} onDragEnter={onDragEnter} onDragLeave={onDragLeave} role="gridcell" tabIndex={0} className="grid-cell"></div>
      ))}
    </React.Fragment>
  );
};

export default GridCells;