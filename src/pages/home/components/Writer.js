import React, { PureComponent } from 'react';
import { WriterWrapper, } from '../style';

class Writer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <WriterWrapper>Writer...</WriterWrapper>
    );
  }
}

export default Writer;