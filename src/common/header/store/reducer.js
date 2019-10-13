import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

// immutable库
// immutable对象
// state => immutable对象
const defaultState = fromJS({
  focused: false, // 是否聚焦
  mouseIn: false, // 鼠标是否移入
  list: [], // fromJS会把list=>immutable对象，而不是数组
  page: 1,  // 当前数据页码
  totalPage: 1 // 总页码数
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_FOCUS:
      // {focused: true}
      // immutable对象的set方法，会结合之前immutable对象的值
      // 和设置的值，返回一个全新的对象
      // 因为直接return出去了，所以没有break
      return state.set('focused', true);
    case actionTypes.SEARCH_BLUR:
      return state.set('focused', false);
    case actionTypes.CHANGE_LIST:
      // return state.set('list', action.data).set('totalPage',action.totalPage);
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      });
    case actionTypes.MOUSE_ENTER:
      return state.set('mouseIn', true);
    case actionTypes.MOUSE_LEAVE:
      return state.set('mouseIn', false);
    case actionTypes.CHANGE_PAGE:
      return state.set('page', action.page);
    default:
      return state;
  }
}