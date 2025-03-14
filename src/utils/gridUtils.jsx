import { COLS, GAP, ROWS } from "./Constants";

export const getGridHeight = (ref) => {
    return ref.current.offsetHeight/ROWS - GAP
};

export const getGridWidth = (ref) => {
    return ref.current.offsetWidth/COLS - GAP
};