import axios from 'axios';
import * as actionTypes from './actionTypes';


const changeDetailAction = (title, imgUrl, content) =>({
  type: actionTypes.CHANGE_DETAIL,
  title,
  imgUrl,
  content
});

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id=' + id).then((res)=>{
      const result = res.data.data;
      const { title, imgUrl, content } = result;
      dispatch(changeDetailAction(title, imgUrl, content));
    }).catch((error)=>{
      console.log(error)
    })
  }
}