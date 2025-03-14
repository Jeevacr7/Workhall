import { useCallback, useEffect, useRef, useState } from 'react';
import { GAP, X_POSITION } from '../utils/Constants';
import { getGridHeight, getGridWidth } from "../utils/gridUtils";

const useMouseEvents = ({ x, y, width, height, artboardRef }) => {
    const [size, setSize] = useState({ width, height });
    const [resizing, setResizing] = useState(false);
    const [position, setPosition] = useState({ x, y });
    const sizeRef = useRef({ width, height });
    
    const handleResizeMouseDown = useCallback((e) => {
        e.stopPropagation();
        setResizing(true);
        e.preventDefault();
    }, []);

    const handleResizeMouseMove = useCallback((e) => {
        if (!resizing) return;
        const width = getGridWidth(artboardRef);
        const height = getGridHeight(artboardRef);
        const rect = artboardRef.current.getBoundingClientRect();

        setSize({
            width: Math.max(width, Math.min(e.clientX - position.x, rect.width - position.x - GAP)),
            height: Math.max(height, Math.min(e.clientY - position.y, rect.height - position.y - GAP)),
        });
    }, [resizing, position]);

    const handleResizeMouseUp = useCallback((e) => {
        if (!resizing || !artboardRef.current) return;
        const width = getGridWidth(artboardRef);
        const height = getGridHeight(artboardRef);
        const rect = artboardRef.current.getBoundingClientRect();
        const newWidth = Math.max(width, Math.min(Math.round((e.clientX - position.x) / (width + GAP)) * (width + GAP) - GAP, rect.width - position.x - GAP));
        const newHeight = Math.max(height, Math.min(Math.round((e.clientY - position.y) / (height + GAP)) * (height + GAP) - GAP, rect.height - position.y - GAP));
        setSize({ width: newWidth, height: newHeight });
        setResizing(false);
    }, [resizing, position]);

    const handleResize = useCallback((e) => {
        if (!artboardRef.current) return;
        const gridWidth = getGridWidth(artboardRef) + GAP;
        const gridHeight = getGridHeight(artboardRef) + GAP;
        setPosition(prev => {
            // Round x position to nearest grid line
            const newX = Math.max(X_POSITION, Math.round(prev.x / gridWidth) * gridWidth);
            return { ...prev, x: newX };
        });
        setSize(prev => {
            const newWidth = Math.max(gridWidth, (Math.round(prev.width / gridWidth) * gridWidth)) - GAP;
            const newHeight = Math.max(gridHeight, (Math.round(prev.height / gridHeight) * gridHeight)) - GAP;
            sizeRef.current = { height: newHeight, width: newWidth };
            return { height: newHeight, width: newWidth };
        });
    }, [position, size]);


    useEffect(() => {
        const artboard = artboardRef.current;
        if (!artboard) return;

        artboard.addEventListener("mousemove", handleResizeMouseMove);
        artboard.addEventListener("mouseup", handleResizeMouseUp);
        artboard.addEventListener("mouseleave", handleResizeMouseUp);
        window.addEventListener("resize", handleResize);
      return () => {
            artboard.removeEventListener("mousemove", handleResizeMouseMove);
            artboard.removeEventListener("mouseup", handleResizeMouseUp);
            artboard.removeEventListener("mouseleave", handleResizeMouseUp);
            window.removeEventListener("resize", handleResize);
        };
    }, [resizing]);

    return { size, position, handleResizeMouseDown }
}

export default useMouseEvents