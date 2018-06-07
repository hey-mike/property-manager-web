import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import withSizes from 'react-sizes';
import ActionBar from './actionbar/ActionBar';
import TenantList from './tenant-list/TenantList';
import TenantTable from './tenant-table/TenantTable';
import './TenantPage.css';

class Tenant extends React.Component {
  render() {
    const { isTabletAndSmaller } = this.props;
    console.log('isTabletAndSmaller', isTabletAndSmaller);
    return (
      <Card>
        <ActionBar />
        {isTabletAndSmaller && <TenantList />}
        {!isTabletAndSmaller && <TenantTable />}
      </Card>
    );
  }
}
Tenant.prototypes = {
  history: PropTypes.object.isRequired,
};
const mapSizesToProps = sizes => ({
  isTabletAndSmaller: !withSizes.isDesktop(sizes),
});
export default withRouter(withSizes(mapSizesToProps)(Tenant));
