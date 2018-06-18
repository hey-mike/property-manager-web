import React from 'react';
import { List, Row, Col } from 'antd';
import ServiceCard from './service-card/ServiceCard';

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
    return (
      // <Row gutter={16}>
      //   <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      //     <ServiceCard title="Plumber" description="this is description" />
      //   </Col>
      //   <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      //     <ServiceCard title="Electrician" description="this is description" />
      //   </Col>
      //   <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      //     <ServiceCard title="plumber" description="this is description" />
      //   </Col>
      // </Row>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 2, xxl: 3 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <ServiceCard title={item.title} description="this is description" />
          </List.Item>
        )}
      />
    );
  }
}
export default ServicePage;
