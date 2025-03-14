import React, { useState, useRef } from "react";
import "./GridLayout.css";
import { COLS, GAP, GRID_SIZE_Y, ROWS, X_POSITION, Y_POSITION } from "../../utils/Constants";
import ResizableDiv from "../resizableDiv/ResizableDiv";
import useDragAndDrop from "../../hooks/useDragAndDrop";

const GridPageBuilder = () => {
  const [components, setComponents] = useState([]);
  const { onDragEnter, onDragLeave, handleDrop, handleDragOver } = useDragAndDrop();
  const artboardRef = useRef(null);

  const addComponent = (x = X_POSITION, y = Y_POSITION) => {
    setComponents((prev) => [
      ...prev,
      { id: Date.now(), x: x, y: y, width: artboardRef.current.offsetWidth/4 - GAP, height: GRID_SIZE_Y },
    ]);
  };

  return (
    <div className="page-container">
      <section className="left-section">
        <div className="artboard" ref={artboardRef} onDrop={(e)=>handleDrop(e, artboardRef, addComponent)} onDragOver={handleDragOver}>
          {[...Array(COLS * ROWS)].map((_, i) => (
            <div key={i} onDragEnter={onDragEnter} onDragLeave={onDragLeave} className="grid-cell"></div>
          ))}
          {components.map((comp) => (
            <ResizableDiv key={comp.id} {...comp} artboardRef={artboardRef} />
          ))}
        </div>
      </section>
      <section className="right-section">
          <div>
            <p>Components</p>
            <div className="components" draggable>
              <img src="https://cdn-icons-png.flaticon.com/512/3093/3093748.png" alt="Report Icon"/>
              Report
            </div>
          </div>
      </section>
    </div>
  );
};



export default GridPageBuilder;
