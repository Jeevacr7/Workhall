import { useCallback, useEffect, useRef, useState } from 'react';
import { COLS, GAP, ROWS, X_POSITION, Y_POSITION } from '../utils/Constants';
import { getGridHeight, getGridWidth } from "../utils/gridUtils";

const useMouseEvents = ({ x, y, width, height, artboardRef }) => {
    const [size, setSize] = useState({ width, height });
    const [resizing, setResizing] = useState(false);
    const [position, setPosition] = useState({ x, y });
    const [occupiedColsRows, setOccupiedColsRows] = useState({ cols: 0, rows: 0 });
    const handleResizeMouseDown = useCallback((e) => {
        e.stopPropagation();
        setResizing(true);
        e.preventDefault();
    }, []);

    const handleResizeMouseMove = useCallback((e) => {
        if (!resizing) return;
        const width = getGridWidth(artboardRef);
        const height = getGridHeight(artboardRef);

        setSize({
            width: Math.max(width, e.clientX - position.x),
            height: Math.max(height, e.clientY - position.y),
        });
    }, [resizing, position]);

    const handleResizeMouseUp = useCallback((e) => {
        if (!resizing || !artboardRef.current) return;
    
        const width = getGridWidth(artboardRef);
        const height = getGridHeight(artboardRef);
        const rect = artboardRef.current.getBoundingClientRect();
    
        const colSpan = Math.round((e.clientX - position.x) / (width + GAP));
        const rowSpan = Math.round((e.clientY - position.y) / (height + GAP));
    
        const maxWidth = rect.width - position.x - GAP;
        const maxHeight = rect.height - position.y - GAP;
    
        const newWidth = Math.max(width, Math.min(colSpan * (width + GAP) - GAP, maxWidth));
        const newHeight = Math.max(height, Math.min(rowSpan * (height + GAP) - GAP, maxHeight));
    
        setSize({width: newWidth, height: newHeight });
    
        const newRows = Math.min(rowSpan, ROWS);
        const newCols = Math.min(colSpan, COLS);
        setOccupiedColsRows({ cols: newCols, rows: newRows });
    
        setResizing(false);
    }, [resizing, position]);
    

    const handleResize = useCallback((e) => {
        const gridWidth = getGridWidth(artboardRef) + GAP;
        const gridHeight = getGridHeight(artboardRef) + GAP;
        const newHeight = Math.max(gridHeight - GAP, occupiedColsRows.rows * gridHeight - GAP);
        const newWidth = Math.max(gridWidth - GAP, occupiedColsRows.cols * gridWidth - GAP);       
        setSize({ height: newHeight, width: newWidth });
    }, [occupiedColsRows]);

    const handleResizePosition = useCallback((e) => {
        if (!artboardRef.current) return;
        const gridWidth = getGridWidth(artboardRef) + GAP;      
        const gridHeight = getGridHeight(artboardRef) + GAP;
        const rect = artboardRef.current.getBoundingClientRect();
        console.log(rect);
        
        setPosition(prev => {
            // Round x position to near est grid line
            const newX = Math.max(X_POSITION, Math.round(prev.x / gridWidth) * gridWidth + X_POSITION);
            const newY = Math.max(Y_POSITION, Math.round(prev.y / gridHeight) * gridHeight + Y_POSITION);
            return { y: newY, x: newX };
        });
    }, [position.x]);

    useEffect(() => {
        if(!artboardRef.current) return;

        const observer = new ResizeObserver((e) => {
                handleResize();
                handleResizePosition();
        });
        observer.observe(artboardRef.current);
        return () => {
            observer.disconnect();
        };  
    }, [handleResize, handleResizePosition]);

    useEffect(() => {
        const artboard = artboardRef.current;
        if (!artboard) return;

        artboard.addEventListener("mousemove", handleResizeMouseMove);
        artboard.addEventListener("mouseup", handleResizeMouseUp);
        artboard.addEventListener("mouseleave", handleResizeMouseUp);
        return () => {
            artboard.removeEventListener("mousemove", handleResizeMouseMove);
            artboard.removeEventListener("mouseup", handleResizeMouseUp);
            artboard.removeEventListener("mouseleave", handleResizeMouseUp);
        };
    }, [resizing]);

    return { size, position, handleResizeMouseDown }
}

export default useMouseEvents