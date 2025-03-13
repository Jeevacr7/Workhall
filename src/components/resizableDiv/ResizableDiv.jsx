import { useState, useRef, useEffect } from "react";
import "./ResizableDiv.css";
import { GAP, GRID_SIZE_X, GRID_SIZE_Y } from "../../utils/Constants";


const ResizableDiv = ({ id, x, y, width, height, artboardRef }) => {
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const resizableRef = useRef(null);

  const handleMouseDown = (e) => {
    // console.log('mousedown calls when clicked on component');

    if (e.target.classList.contains("resize-handle")) return;
    setDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    console.log('mousemove calls when dragging', 2);
    
    if (!dragging || !artboardRef.current) return;
    const rect = artboardRef.current.getBoundingClientRect();
    let newX = Math.round((e.clientX - rect.left) / (GRID_SIZE_X + GAP)) * (GRID_SIZE_X + GAP) + 6;
    let newY = Math.round((e.clientY - rect.top) / (GRID_SIZE_Y + GAP)) * (GRID_SIZE_Y + GAP) + 6;
    newX = Math.max(6, Math.min(newX, rect.width - size.width));
    newY = Math.max(6, Math.min(newY, rect.height - size.height)); -
    setPosition({ x: newX, y: newY });
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
      width: Math.max(GRID_SIZE_X, e.clientX - resizableRef.current.offsetLeft),
      height: Math.max(GRID_SIZE_Y, e.clientY - resizableRef.current.offsetTop),
    });
  };

  const handleResizeMouseUp = (e) => {
    if (resizing || artboardRef.current) {
      let newWidth = Math.round((e.clientX - position.x) / (GRID_SIZE_X + GAP)) * (GRID_SIZE_X + GAP) - GAP;
      let newHeight = Math.round((e.clientY - position.y) / (GRID_SIZE_Y + GAP)) * (GRID_SIZE_Y + GAP) - GAP;
      setSize({ width: Math.max(GRID_SIZE_X, newWidth), height: Math.max(GRID_SIZE_Y, newHeight) });
    }
    setResizing(false);
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", handleResizeMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", handleResizeMouseUp);
    };
  }, [dragging, resizing]);

  return (
    <div
      className="component"
      ref={resizableRef}
      style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
      onMouseDown={handleMouseDown}
    >
      Drag
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
};

export default ResizableDiv