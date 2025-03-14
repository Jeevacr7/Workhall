import { GAP, getGridHeight, getGridWidth, X_POSITION, Y_POSITION } from "../utils/Constants";

const useDragAndDrop = () => {

    const onDrag = (e) => {
        e.preventDefault();
        // e.target.style.opacity = 0.5;
        // debugger
    }
    const onDragEnter = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = '#dee5ff';
        e.target.style.borderColor = '#3897ea';

    }

    const onDragLeave = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = null;
        e.target.style.borderColor = null;
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (e, artboardRef, onDropCallback) => {
        e.preventDefault();
        const rect = artboardRef.current.getBoundingClientRect();
        const width = getGridWidth(artboardRef);
        const height = getGridHeight(artboardRef);
        let newX = Math.floor((e.clientX - rect.left) / (width + GAP)) * (width + GAP) + X_POSITION;
        let newY = Math.floor((e.clientY - rect.top) / (height + GAP)) * (height + GAP) + Y_POSITION;
        newX = Math.max(X_POSITION, Math.min(newX, rect.width - width));
        newY = Math.max(Y_POSITION, Math.min(newY, rect.height - height));
        onDropCallback(newX, newY);
        e.target.style.backgroundColor = null;
        e.target.style.borderColor = null;
    };
    

    return { onDragEnter, onDragLeave, handleDragOver, handleDrop, onDrag }
}

export default useDragAndDrop