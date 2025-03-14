import { GAP, GRID_SIZE_Y, X_POSITION, Y_POSITION } from "../utils/Constants";

const useDragAndDrop = () => {
    const onDragEnter = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }

    const onDragLeave = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = 'transparent';
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (e, artboardRef, onDropCallback) => {
        e.preventDefault();
        const rect = artboardRef.current.getBoundingClientRect();
        const width = artboardRef.current.offsetWidth/4 - GAP;
        let newX = Math.floor((e.clientX - rect.left) / (width + GAP)) * (width + GAP) + X_POSITION;
        let newY = Math.floor((e.clientY - rect.top) / (GRID_SIZE_Y + GAP)) * (GRID_SIZE_Y + GAP) + Y_POSITION;
        newX = Math.max(X_POSITION, Math.min(newX, rect.width - width));
        newY = Math.max(Y_POSITION, Math.min(newY, rect.height - GRID_SIZE_Y));
        console.log(e.target.dataType);
        onDropCallback(newX, newY);
        e.target.style.backgroundColor = 'transparent';
    };
    

    return { onDragEnter, onDragLeave, handleDragOver, handleDrop }
}

export default useDragAndDrop