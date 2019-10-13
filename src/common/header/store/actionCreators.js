import axios from 'axios';
import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

// 更改-头部搜索框【热门搜索】数据action
const changeListAction = (data) => ({
  type: actionTypes.CHANGE_LIST,
  data: fromJS(data), // 变成immutable对象
  totalPage: Math.ceil(data.length / 10)
});

// 搜索框聚焦action
export const searchFocusAction = () => ({
  type: actionTypes.SEARCH_FOCUS
});

// 搜索框失焦action
export const searBlurAction = () => ({
  type: actionTypes.SEARCH_BLUR
});

// 鼠标移入action
export const mouseEnterAction = () => ({
  type: actionTypes.MOUSE_ENTER
});

// 鼠标移出action
export const mouseLeaveAction = () => ({
  type: actionTypes.MOUSE_LEAVE
});

// 更改-搜索框【热门搜索】页码action
export const changePageAction = (page) => ({
  type: actionTypes.CHANGE_PAGE,
  page
});


// 获取-头部搜索框【热门搜索】数据
export const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json').then((res)=>{
      const { data } = res;
      dispatch(changeListAction(data.data));  // 传递给reducer
    }).catch(() => {
      console.log('error')
    })
  }
};
