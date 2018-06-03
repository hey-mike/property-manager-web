import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';
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
    const { globalMessage } = this.props;
    if (globalMessage.error) {
      // message.error({
      //   content: globalMessage.error,
      //   duration: 2.5,
      //   onClose: this.onClose,
      // });
      message.error(globalMessage.error);
    } else if (globalMessage.success) {
      // message.success({
      //   content: globalMessage.success,
      //   onClose: this.onClose,
      // });
      message.success(globalMessage.success);
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
  return { globalMessage: state.globalMessage };
};
export default connect(mapStateToProps)(GlobalMessage);
