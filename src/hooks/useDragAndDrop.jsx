import { GAP, GRID_SIZE_X, GRID_SIZE_Y } from "../utils/Constants";

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
        let newX = Math.floor((e.clientX - rect.left) / (GRID_SIZE_X + GAP)) * (GRID_SIZE_X + GAP) + 6;
        let newY = Math.floor((e.clientY - rect.top) / (GRID_SIZE_Y + GAP)) * (GRID_SIZE_Y + GAP) + 6;
        newX = Math.max(6, Math.min(newX, rect.width - GRID_SIZE_X));
        newY = Math.max(6, Math.min(newY, rect.height - GRID_SIZE_Y));
        console.log(e.target.dataType);
        onDropCallback(newX, newY);
        e.target.style.backgroundColor = 'transparent';
    };
    

    return { onDragEnter, onDragLeave, handleDragOver, handleDrop }
}

export default useDragAndDrop