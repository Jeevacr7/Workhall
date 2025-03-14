import { useCallback, useEffect, useRef, useState } from 'react'
import { GAP, GRID_SIZE_Y, X_POSITION } from '../utils/Constants';

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
        const width = artboardRef.current.offsetWidth / 4 - GAP;
        const rect = artboardRef.current.getBoundingClientRect();

        setSize({
            width: Math.max(width, Math.min(e.clientX - position.x, rect.width - position.x - GAP)),
            height: Math.max(GRID_SIZE_Y, Math.min(e.clientY - position.y, rect.height - position.y - GAP)),
        });
    }, [resizing, position]);

    const handleResizeMouseUp = useCallback((e) => {
        if (!resizing || !artboardRef.current) return;
        const width = artboardRef.current.offsetWidth / 4 - GAP;
        const rect = artboardRef.current.getBoundingClientRect();
        const newWidth = Math.max(width, Math.min(Math.round((e.clientX - position.x) / (width + GAP)) * (width + GAP) - GAP, rect.width - position.x - GAP));
        const newHeight = Math.max(GRID_SIZE_Y, Math.min(Math.round((e.clientY - position.y) / (GRID_SIZE_Y + GAP)) * (GRID_SIZE_Y + GAP) - GAP, rect.height - position.y - GAP));
        setSize({ width: newWidth, height: newHeight });
        setResizing(false);
    }, [resizing, position]);

    const handleResize = useCallback((e) => {
        if (!artboardRef.current) return;
        const artboard = artboardRef.current;
        const gridWidth = artboard.offsetWidth / 4;
        setPosition(prev => {
            // Round x position to nearest grid line
            const newX = Math.max(X_POSITION, Math.round(prev.x / gridWidth) * gridWidth);
            return { ...prev, x: newX };
        });
        setSize(prev => {
            const newWidth = Math.max(gridWidth, (Math.round(prev.width / gridWidth) * gridWidth)) - GAP;
            sizeRef.current = { ...prev, width: newWidth };
            return { ...prev, width: newWidth };
        });
    }, [position, size]);


    useEffect(() => {
        const artboard = artboardRef.current;
        if (!artboard) return;

        artboard.addEventListener("mousemove", handleResizeMouseMove);
        artboard.addEventListener("mouseup", handleResizeMouseUp);
        artboard.addEventListener("mouseleave", handleResizeMouseUp);
        window.addEventListener("resize", handleResize);
         artboard.addEventListener("resize", handleResize); 
      return () => {
            artboard.removeEventListener("mousemove", handleResizeMouseMove);
            artboard.removeEventListener("mouseup", handleResizeMouseUp);
            artboard.removeEventListener("mouseleave", handleResizeMouseUp);
            window.removeEventListener("resize", handleResize);
            artboard.removeEventListener("resize", handleResize);
        };
    }, [resizing]);

    return { size, position, handleResizeMouseDown }
}

export default useMouseEvents