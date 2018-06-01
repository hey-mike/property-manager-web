import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification } from 'antd';

class GlobalMessage extends React.Component {
  onClose() {
    this.props.dispatch();
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this.props);
    const { globalMessage } = this.props;
    if (globalMessage.error) {
      notification.error({
        message: globalMessage.error,
      });
    }
  }
}
GlobalMessage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return { globalMessage: state.globalMessage };
};
export default connect(mapStateToProps)(GlobalMessage);
