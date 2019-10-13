import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWapper, TopicItem } from '../style';

// 话题
class Topic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    return (
      <TopicWapper>
        { 
          list.map((item) => {
            return(
              <TopicItem key={item.get('id')}>
                <img
                  className='topic-pic'
                  alt=''
                  src={item.get('imgUrl')}
                />
                {item.get('title')}
              </TopicItem>
            )
          })  
        }
      </TopicWapper>
    );
  }
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home','topicList']),
});


export default connect(mapStateToProps, null)(Topic);