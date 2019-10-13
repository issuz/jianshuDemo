import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RecommendWrapper, RecommendItem } from '../style';

// 评论
class Recommend extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    return (
      <RecommendWrapper>
        {
          list.map((item)=>{
            return(
              <RecommendItem key={item.get('id')} imgUrl={item.get('imgUrl')}></RecommendItem>
            )
          })
        }
      </RecommendWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.getIn(['home','recommendList']),
});

export default connect(mapStateToProps, null)(Recommend);