import React, { useState, useRef } from "react";
import "./GridLayout.css";
import { COLS, getGridHeight, getGridWidth, ROWS, X_POSITION, Y_POSITION } from "../../utils/Constants";
import ResizableDiv from "../resizableDiv/ResizableDiv";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import chart from '../../assets/growth.png'
const GridPageBuilder = () => {
  const [components, setComponents] = useState([]);
  const { onDragEnter, onDragLeave, handleDrop, handleDragOver, onDrag } = useDragAndDrop();
  const artboardRef = useRef(null);

  const addComponent = (x = X_POSITION, y = Y_POSITION) => {
    const width = getGridWidth(artboardRef);
    const height = getGridHeight(artboardRef);
    setComponents((prev) => [
      ...prev,
      { id: Date.now(), x: x, y: y, width: width, height: height },
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
            <div className="components" draggable onDrag={onDrag}>
              <img src={chart} alt="Report Icon"/>
              Report
            </div>
          </div>
      </section>
    </div>
  );
};



export default GridPageBuilder;
