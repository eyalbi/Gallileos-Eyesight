import { ANALYZE_PHOTO, CREATE_RESULT, SET_RESULTS } from "../actions/result";
import Result from "../../models/result";

const initialState = {
  results: [],
  currentId: null
};
export default (state = initialState, action) => {
  switch (action.type){
    case SET_RESULTS:
      return {
        results: action.results
      };
    case ANALYZE_PHOTO:
      const newResult = new Result(
        action.resultData.id,
        action.resultData.img,
        action.resultData.labels,
        action.resultData.date,
      );
      return {
          ...state,
          results: state.results.concat(newResult),
          currentId: action.resultData.id
      };  
  }
  return state;
};