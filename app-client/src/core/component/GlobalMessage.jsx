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
      message.error({
        message: globalMessage.error,
        onClose: this.onClose,
      });
    } else if (globalMessage.success) {
      message.success({
        message: globalMessage.success,
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
  return { globalMessage: state.globalMessage };
};
export default connect(mapStateToProps)(GlobalMessage);
