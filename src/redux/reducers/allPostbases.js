import { TOGGLE_ALL_POSTBASES } from '../actionTypes';

const initialState = {
  allPostbasesMode: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_ALL_POSTBASES:
      return {
        ...state,
        allPostbasesMode: !state.allPostbasesMode
      };
    default:
      return state;
  }

}
