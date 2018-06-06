import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './NavDrawer.css';
import SideNavMenu from './SideNavMenu';
import Drawer from 'rc-drawer';
import 'rc-drawer-menu/assets/index.css';

class NavDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onChange = bool => {
    console.log(bool);
  };
  onTouchEnd = () => {
    this.props.toggle();
  };

  onSelect(item) {
    this.props.toggle();
    this.props.history.push(`${item.key}`);
  }

  render() {
    const { open } = this.props;
    console.log('open', open);

    return (
      <Drawer
        onHandleClick={this.onChange}
        onChange={this.onChange}
        open={open}
        onMaskClick={this.onTouchEnd}
        handleChild={false}
        level={null}>
        <div className="logo" />
        <SideNavMenu toggle={this.props.toggle} />
      </Drawer>
    );
  }
}

NavDrawer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavDrawer);
