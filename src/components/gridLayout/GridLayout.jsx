import React, { useState, useRef } from "react";
import "./GridLayout.css";
import { COLS, GRID_SIZE_X, GRID_SIZE_Y, ROWS } from "../../utils/Constants";
import ResizableDiv from "../resizableDiv/ResizableDiv";

const GridPageBuilder = () => {
  const [components, setComponents] = useState([]);
  const artboardRef = useRef(null);

  const addComponent = () => {
    setComponents((prev) => [
      ...prev,
      { id: Date.now(), x: 6, y: 6, width: GRID_SIZE_X, height: GRID_SIZE_Y },
    ]);
  };

  return (
    <div className="page-container">
      <button className="btn" onClick={addComponent}>Add Component</button>
      <div className="artboard" ref={artboardRef}>
        {[...Array(COLS * ROWS)].map((_, i) => (
          <div key={i} className="grid-cell"></div>
        ))}
        {components.map((comp) => (
          <ResizableDiv key={comp.id} {...comp} artboardRef={artboardRef} />
        ))}
      </div>
    </div>
  );
};



export default GridPageBuilder;
