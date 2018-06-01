import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { resetNotification } from '../actions/notificationActions';

class GlobalNotification extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    this.props.dispatch(resetNotification());
  }
  componentDidUpdate() {
    const { globalNotification } = this.props;
    if (globalNotification.error) {
      notification.error({
        message: globalNotification.error,
        onClose: this.onClose,
      });
    } else if (globalNotification.success) {
      notification.success({
        message: globalNotification.success,
        onClose: this.onClose,
      });
    }
  }
  render() {
    return <div />;
  }
}
GlobalNotification.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return { globalNotification: state.globalNotification };
};
export default connect(mapStateToProps)(GlobalNotification);
