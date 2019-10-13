import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: false
});


// 更改-首页数据
const changelHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList)
  });
}

// 获取-更多文章列表数据
const addHomeArticlelist = (state, action) => {
  return state.merge({
    articleList: state.get('articleList').concat(fromJS(action.list)),
    articlePage: action.nextPage
  });
}

// 回到顶部
const toggleScrollTop = (state, action) => {
  return state.set('showScroll', action.show);
}



export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_HOME_DATA:
      return changelHomeData(state, action);
    case actionTypes.ADD_HOME_ARTICLELIST:
      return addHomeArticlelist(state, action);
    case actionTypes.TOGGLE_SCROll_TOP:
      return toggleScrollTop(state, action);
    default:
      return state;
  }
}