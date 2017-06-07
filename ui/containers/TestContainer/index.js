import React from 'react';
import { connect } from 'react-redux';

/**
 * TestContainer
 */
class TestContainer extends React.Component {

  render() {
    return (
      <div className="container"></div>
    );
  }
}

export default connect()(TestContainer);
