import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { 
  HeaderWrapper, 
  Logo, 
  Nav, 
  NavItem, 
  SearchWapper, 
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition, 
  Button,
} from './style';



class Header extends PureComponent{

  getListArea() {
    const { 
      focused, 
      list, 
      page, 
      totalPage,
      mouseIn, 
      handleMouseEnter, 
      handleMouseLeave, 
      handleChangePage 
    } = this.props;
    const newList = list.toJS(); // immutable对象=>JS对象
    const pageList = [];
    const pageLast = page === totalPage ? newList.length: (page * 10);

    if (newList.length){
      for (let i = (page - 1) * 10; i < pageLast; i++) {
        pageList.push(
          <SearchInfoItem key={`${newList[i]}_${i}`}>{newList[i]}</SearchInfoItem>
        )
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch 
              onClick={() => handleChangePage(page, totalPage,this.spinIcon)}
            >
              <i ref={(icon) => {this.spinIcon = icon}} className='iconfont spin'>&#xe851;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            { pageList }
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null;
    }
  }

  render(){
    const { focused, handleInputFocus, handleInputBlur, list, login, logOut } = this.props;
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo />
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login ? 
              <NavItem onClick={logOut} className='right'>退出</NavItem> : 
              <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
          }
          <NavItem className='right'>
            <i className='iconfont'>&#xe636;</i>
          </NavItem>
          <SearchWapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames='slide'
            >
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={()=>handleInputFocus(list)}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <i
              className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}
            >&#xe602;</i>
            {this.getListArea()}
          </SearchWapper>
        </Nav>
        <Addition>
          <Link to='/write'>
            <Button className='writting'><i className='iconfont'>&#xe615;</i>写文章</Button>
          </Link>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    /* 
      focused: state.header.focused,
      focused: state.header.get('focused'),
      focused: state.get('header').get('focused'),   
      1.headerReducer里返回的数据;
      2.用redux-immutable 将state变为immutable对象，可以使用 .get()方法 
    */
    focused: state.getIn(['header','focused']),
    list: state.getIn(['header','list']),
    page: state.getIn(['header','page']),
    totalPage: state.getIn(['header','totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login','login'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    handleInputFocus(list) {
      if(list.size === 0) dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocusAction());
    },
    handleInputBlur(){
      dispatch(actionCreators.searBlurAction());
    },
    handleMouseEnter(){
      dispatch(actionCreators.mouseEnterAction())
    },
    handleMouseLeave(){
      dispatch(actionCreators.mouseLeaveAction())
    },
    handleChangePage(page, totalPage, spin){
      // 图标转圈动画
      let orginAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      orginAngle = orginAngle ? parseInt(orginAngle, 10) : 0;
      spin.style.transform = `rotate(${orginAngle+360}deg)`;

      const newPage = page < totalPage ? page + 1 : 1;
      dispatch(actionCreators.changePageAction(newPage));
    },
    logOut(){
      dispatch(loginActionCreators.logoutAction());
    }
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header);