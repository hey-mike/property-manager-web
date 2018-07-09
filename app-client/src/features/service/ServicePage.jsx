import React from 'react';
import AddServiceCard from './AddServiceCard';
import ServiceCard from './service-card/ServiceCard';
import { Row, Col } from 'antd';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

class ServicePage extends React.Component {
  render() {
    const services = data.map(item => (
      <Col xs={24} sm={24} md={24} lg={12} xl={6}>
        <ServiceCard title={item.title} description="this is description" />
      </Col>
    ));
    return (
      // <div>
      //   <AddServiceCard />
      //   <List
      //     grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 3, xxl: 3 }}
      //     dataSource={data}
      //     renderItem={item => (
      //       <List.Item>
      //         <ServiceCard
      //           title={item.title}
      //           description="this is description"
      //         />
      //       </List.Item>
      //     )}
      //   />
      // </div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12} xl={6}>
          <AddServiceCard />
        </Col>
        {services}
      </Row>
    );
  }
}
export default ServicePage;
