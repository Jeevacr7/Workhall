export const GAP = 12;
export const COLS = 4;
export const ROWS = 8;
export const X_POSITION = 6;
export const Y_POSITION = 6;

export const getGridHeight = (ref) => {
    return ref.current.offsetHeight/ROWS - GAP
};

export const getGridWidth = (ref) => {
    return ref.current.offsetWidth/COLS - GAP
};