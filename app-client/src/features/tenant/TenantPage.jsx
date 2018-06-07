import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import withSizes from 'react-sizes';
import SearchBar from './searchbar/SearchBar';
import TenantList from './tenant-list/TenantList';
import './TenantPage.css';

class Tenant extends React.Component {
  render() {
    const { isMobile } = this.props;
    console.log(isMobile);
    return (
      <Card>
        <SearchBar />
        <TenantList />
      </Card>
    );
  }
}
Tenant.prototypes = {
  history: PropTypes.object.isRequired,
};
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
});
export default withRouter(withSizes(mapSizesToProps)(Tenant));
