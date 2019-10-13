import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';

// 详情页
class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    // 【动态路由方式】: /detail/:id   [this.props.match.params]  上一个页面传过来的参数
    this.props.getDetail(this.props.match.params.id);
    // this.props.getDetail(this.props.location.match)
  }

  render() { 
    const { title, imgUrl, content } = this.props;
    return ( 
      <DetailWrapper>
        {/* <div>You are now at {this.props.location.pathname}</div> */}
        <Header>{title}_{this.props.match.params.id}</Header>
        <Content>
          <img
            alt=''
            src={imgUrl}
          />
          <p>{content}</p>
        </Content>
      </DetailWrapper>
     );
  }
}

const mapStateToProps = (state) => ({
  title: state.getIn(['detail','title']),
  imgUrl: state.getIn(['detail','imgUrl']),
  content: state.getIn(['detail','content'])
});

const mapDispatchToProps = (dispatch) => ({
  getDetail(id){
    dispatch(actionCreators.getDetail(id))
  }
});
 
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
// withRouter : 让这个 detail组件 有能力获取到 router 内所有的参数和内容