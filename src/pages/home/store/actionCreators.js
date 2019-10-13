import axios from 'axios';
import * as actionTypes from './actionTypes';

// 更改-首页数据action
const changeHomeDataAction = (data) => ({
  type: actionTypes.CHANGE_HOME_DATA,
  topicList: data.topicList,
  articleList: data.articleList,
  recommendList: data.recommendList
});

// 增加-首页文章列表action
const addHomeListAction = (list, nextPage) =>({
  type: actionTypes.ADD_HOME_ARTICLELIST,
  list,
  nextPage
});



// 获取-首页数据
export const getHomeInfo = () => {
  return (dispatch)=>{
    axios.get('/api/home.json').then((res) => {
      const result = res.data.data;
      dispatch(changeHomeDataAction(result));
    }).catch((error) => {
      console.log(error);
    })
  }
}

// 获取-更多文章列表数据
export const getMoreList = (page)=> {
  return (dispatch)=>{
    axios.get('/api/homeList.json?page='+page).then((res) => {
      const result = res.data.data.articleList;
      dispatch(addHomeListAction(result, page+1))
    }).catch((error) => {
      console.log(error);
    })
  }
}

// 回到顶部
export const toggleTopShowAtion = (show) => ({
  type: actionTypes.TOGGLE_SCROll_TOP,
  show
});