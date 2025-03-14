import { useCallback, useEffect, useState } from 'react'
import { GAP, GRID_SIZE_X, GRID_SIZE_Y } from '../utils/Constants';

const useMouseEvents = ({ x, y, width, height, artboardRef }) => {
    const [size, setSize] = useState({ width, height });
    const [resizing, setResizing] = useState(false);

    const handleResizeMouseDown = useCallback((e) => {
        e.stopPropagation();
        setResizing(true);
        e.preventDefault();
    },[]);

    const handleResizeMouseMove = useCallback((e) => {
        if (!resizing) return;
        setSize({
            width: Math.max(GRID_SIZE_X, e.clientX - x),
            height: Math.max(GRID_SIZE_Y, e.clientY - y),
        });

    },[resizing, x, y]);

    const handleResizeMouseUp = useCallback((e) => {
        if (!resizing || !artboardRef.current) return;
        const rect = artboardRef.current.getBoundingClientRect();
        const newWidth = Math.max(GRID_SIZE_X,Math.min(Math.round((e.clientX - x) / (GRID_SIZE_X + GAP)) * (GRID_SIZE_X + GAP) - GAP,rect.width - x - GAP));
        const newHeight = Math.max(GRID_SIZE_Y,Math.min(Math.round((e.clientY - y) / (GRID_SIZE_Y + GAP)) * (GRID_SIZE_Y + GAP) - GAP,rect.height - y - GAP));
        setSize({ width: newWidth, height: newHeight });
        setResizing(false);
    }, [resizing, x, y]);
    

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

    return { size, handleResizeMouseDown }
}

export default useMouseEvents