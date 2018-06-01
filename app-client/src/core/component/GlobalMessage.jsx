import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { resetMessage } from '../actions/messageActions';

class GlobalMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    this.props.dispatch(resetMessage());
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this.props);
    const { globalMessage } = this.props;
    if (globalMessage.error_message) {
      notification.error({
        message: globalMessage.error_message,
        onClose: this.onClose,
      });
    } else if (globalMessage.success_message) {
      notification.success({
        message: globalMessage.success_message,
        onClose: this.onClose,
      });
    }
  }
  render() {
    return <div />;
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
