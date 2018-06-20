import React from 'react';
import { List } from 'antd';
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
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 3, xxl: 3 }}
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
