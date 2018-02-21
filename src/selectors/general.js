import { createSelector } from "reselect";
import * as qs from 'query-string';

export const getSelectedFilter = createSelector(
    props => props.location.search, search => qs.parse(search).filter   
)