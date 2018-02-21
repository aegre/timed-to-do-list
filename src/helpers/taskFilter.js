import { FILTER_SHORT, FILTER_MEDIUM, FILTER_LONG } from "../constants";
import { getSelectedFilter } from "../selectors/general";

export const getTaskFilter = (props) => {
    const filter = getSelectedFilter(props)
    switch(filter)
    {
        case FILTER_SHORT:
            return shortFilter;
        case FILTER_MEDIUM:
            return mediumFilter;
        case FILTER_LONG: 
            return longFilter;
        default:
            return allFilter;
    }
}

const shortFilter = task => (
    //Less than 30 minutes
    task.duration <= 1800
)

const mediumFilter = task => (
    //between 30 and 60 minutes
    task.duration > 1800 && task.duration <= 3600
)

const longFilter = task => (
    //more than 60 minutes
    task.duration > 3600
)

const allFilter = task => (
    true
)