import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
  title: '',
  imgUrl: '',
  content: ''
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DETAIL: 
      return state.merge({
        title: action.title,
        imgUrl: action.imgUrl,
        content: action.content,
      });
    default:
      return state;
  }
}