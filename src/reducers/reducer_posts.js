import { FETCH_POSTS } from "../actions/index";
import { FETCH_POST } from "../actions/index";
import { FETCHING_POST } from "../actions/index";
import { POST_COMMENT } from "../actions/index";

const INITIAL_STATE = { all: [], current: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS: {
      return { ...state, all: action.payload };
    }
    case FETCH_POST: {
      return { ...state, current: action.payload };
    }
    case FETCHING_POST: {
      return { ...state, current: null };
    }
    case POST_COMMENT: {
      return { ...state, current: { ...state.current, comments: [...state.current.comments, action.payload.data] } };
    }
    default:
      return state;
  }
}