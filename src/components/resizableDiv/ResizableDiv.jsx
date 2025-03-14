import useMouseEvents from "../../hooks/useMouseEvents";
import Report from "../barChart/Report";
import "./ResizableDiv.css";


const ResizableDiv = ({ x, y, width, height, artboardRef }) => {
  const { size, handleResizeMouseDown } = useMouseEvents({ x, y, width, height, artboardRef });
  return (
    <div
      className="component"
      style={{ left:x, top: y, width: size.width, height: size.height }}
    >
      <Report height={size.height} />
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
};

export default ResizableDiv