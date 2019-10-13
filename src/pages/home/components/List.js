import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ListItem, ListInfo, LoadMore } from '../style';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

// 文章列表
class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list, getMoreList, page } = this.props;
    return (
      <div>
      {
        list.map((item,index) => {
          return(
            <Link
              key={`${item.get('id')}_${index}`}
              to={'/detail/'+ item.get('id')}
              // to={'/detail?id='+ item.get('id')}
            >
              <ListItem >
                <img
                  className='list-pic'
                  alt=''
                  src={item.get('imgUrl')}
                />
                <ListInfo>
                  <h3 className='title'>{item.get('title')}</h3>
                  <p className='desc'>{item.get('desc')}</p>
                </ListInfo>
              </ListItem>
            </Link>
          )
        })
      }  
        <LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.getIn(['home','articleList']),
  page: state.getIn(['home','articlePage'])
});

const mapDispatchToProps = (dispatch) => {
  return{
    getMoreList(page){
      dispatch(actionCreators.getMoreList(page)) 
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);