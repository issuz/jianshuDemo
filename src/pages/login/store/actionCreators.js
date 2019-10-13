import axios from 'axios';
import * as actionTypes from './actionTypes';

const changeLoginAction = () => ({
  type: actionTypes.CHANGE_LOGIN,
  value: true
});

export const logoutAction = () => ({
  type: actionTypes.LOGOUT,
  value: false
});

export const login = (account, password) => {
  return (dispatch) => {
    axios.get('/api/login.json?account=' + account + '&password=' + password).then((res)=>{
      const result = res.data.data;
      if (result){
        dispatch(changeLoginAction());
      }else{
        alert('登陆失败')
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
}