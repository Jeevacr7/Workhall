import React, { useState, useRef, useLayoutEffect } from "react";
import "./GridLayout.css";
import { COLS, GAP, GRID_SIZE_X, GRID_SIZE_Y, ROWS } from "../../utils/Constants";
import ResizableDiv from "../resizableDiv/ResizableDiv";
import useDragAndDrop from "../../hooks/useDragAndDrop";

const GridPageBuilder = () => {
  const [components, setComponents] = useState([]);
  const { onDragEnter, onDragLeave, handleDrop, handleDragOver } = useDragAndDrop();
  const artboardRef = useRef(null);

  const addComponent = (x = 6, y = 6) => {
    setComponents((prev) => [
      ...prev,
      { id: Date.now(), x: x, y: y, width: GRID_SIZE_X, height: GRID_SIZE_Y },
    ]);
  };


  return (
    <div className="page-container">
      <button className="btn" draggable>Add Component</button>
      <div className="artboard" ref={artboardRef} onDrop={(e)=>handleDrop(e, artboardRef, addComponent)} onDragOver={handleDragOver}>
        {[...Array(COLS * ROWS)].map((_, i) => (
          <div key={i} onDragEnter={onDragEnter} onDragLeave={onDragLeave} className="grid-cell"></div>
        ))}
        {components.map((comp) => (
          <ResizableDiv key={comp.id} {...comp} artboardRef={artboardRef} />
        ))}
      </div>
    </div>
  );
};



export default GridPageBuilder;
