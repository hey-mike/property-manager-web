import React from 'react';
import { Layout } from 'antd';
import './App.css';

const { Header, Footer, Content } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  </div>
);

export default App;
