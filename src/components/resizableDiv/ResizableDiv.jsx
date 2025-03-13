import { useState, useRef, useEffect } from "react";
import "./ResizableDiv.css";
import { GAP, GRID_SIZE_X, GRID_SIZE_Y } from "../../utils/Constants";
import Report from "../barChart/Report";


const ResizableDiv = ({ x, y, width, height, artboardRef }) => {
  const [position] = useState({ x, y });
  const [size, setSize] = useState({ width, height });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const resizableRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains("resize-handle")) return;
    console.log('3');
    setDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => setDragging(false);

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setResizing(true);
    e.preventDefault();
  };

  const handleResizeMouseMove = (e) => {
    if (!resizing || !artboardRef.current) return;
    setSize({
      width: Math.max(GRID_SIZE_X, e.clientX - position.x),
      height: Math.max(GRID_SIZE_Y, e.clientY - position.y),
    });
  };

  const handleResizeMouseUp = (e) => {
    if (resizing) {
      let newWidth = Math.round((e.clientX - position.x) / (GRID_SIZE_X + GAP)) * (GRID_SIZE_X + GAP) - GAP;
      let newHeight = Math.round((e.clientY - position.y) / (GRID_SIZE_Y + GAP)) * (GRID_SIZE_Y + GAP) - GAP;
      setSize({ width: Math.max(GRID_SIZE_X, newWidth), height: Math.max(GRID_SIZE_Y, newHeight) });
    }
    setResizing(false);
    
  }

  useEffect(() => {
    artboardRef.current.addEventListener("mouseup", handleMouseUp);
    artboardRef.current.addEventListener("mousemove", handleResizeMouseMove);
    artboardRef.current.addEventListener("mouseup", handleResizeMouseUp);
    return () => {
      artboardRef.current.removeEventListener("mouseup", handleMouseUp);
      artboardRef.current.removeEventListener("mousemove", handleResizeMouseMove);
      artboardRef.current.removeEventListener("mouseup", handleResizeMouseUp);
    };
  }, [dragging, resizing]);

  return (
    <div
      className="component"
      ref={resizableRef}
      style={{ left:x, top: y, width: size.width, height: size.height }}
      onMouseDown={handleMouseDown}
    >
      <Report height={size.height}/>
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
};

export default ResizableDiv