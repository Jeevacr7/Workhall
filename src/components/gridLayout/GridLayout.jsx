import React, { useRef, useState } from "react";
import chart from '../../assets/growth.png';
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { X_POSITION, Y_POSITION } from "../../utils/Constants";
import ResizableDiv from "../resizableDiv/ResizableDiv";
import "./GridLayout.css";
import GridCells from "./GridCell";
import { getGridHeight, getGridWidth } from "../../utils/gridUtils";
const GridPageBuilder = () => {
  const [components, setComponents] = useState([]);
  const { handleDrop, handleDragOver } = useDragAndDrop();
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
          <GridCells />
          {components.map((comp) => (
            <ResizableDiv key={comp.id} {...comp} artboardRef={artboardRef} />
          ))}
        </div>
      </section>
      <section className="right-section">
          <div>
            <p>Components</p>
            <div className="components" draggable>
              <img src={chart} alt="Report Icon"/>
              Report
            </div>
          </div>
      </section>
    </div>
  );
};



export default GridPageBuilder;
