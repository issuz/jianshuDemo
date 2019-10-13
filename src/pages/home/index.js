import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components//Recommend';
import Writer from './components/Writer';
import { HomeWrapper, HomeLeft, HomeRight, BackToTop } from './style';
import { actionCreators } from './store';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    this.props.changeHomeData();
    this.bindEvents();
  }
  componentWillUnmount() {
    this.unbindEvents();
  }

  handleScrollTop() {
    window.scrollTo(0,0);
  }

  bindEvents(){
    window.addEventListener('scroll', this.props.changeScrollTopShow);
  }

  unbindEvents(){
    window.removeEventListener('scroll', this.props.changeScrollTopShow);
  }


  render() { 
    return ( 
      <HomeWrapper>
        <HomeLeft>
          <img 
            alt=""
            className='banner-img'
            src="https://upload.jianshu.io/admin_banners/web_images/4680/f3832b8ec185f3772a31960a2494964132f29ce0.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
          />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        {
          this.props.showScroll ?
            <BackToTop onClick={this.handleScrollTop}>回到顶部</BackToTop> :
            null
        }
        
      </HomeWrapper>
     );
  }
}

const mapStateToProps = (state) => ({
  showScroll: state.getIn(['home','showScroll'])
});

const mapDispatchToProps = (dispatch) => {
  return{
    changeHomeData(){
      const action = actionCreators.getHomeInfo();
      dispatch(action);
    },
    changeScrollTopShow(e){
      document.documentElement.scrollTop > 100 ? 
        dispatch(actionCreators.toggleTopShowAtion(true)):
        dispatch(actionCreators.toggleTopShowAtion(false));
    }
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Home);