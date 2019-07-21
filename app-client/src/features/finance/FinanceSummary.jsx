import React from 'react';
import { List } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const fake_summary = [
  { item: 'Gross rent', value: 1000 },
  { item: 'Total expenses', value: 800 },
  {
    item: 'Net rental income or loss(Gross rent less total expenses)',
    value: 1000,
  },
];
const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
class FinanceSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.getData(res => {
      this.setState({
        loading: false,
        data: res.results,
      });
    });
  }
  getData = callback => {
    axios({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
    }).then(function(response) {
      callback(response.data);
      // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
    });
  };
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          loadingMore: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        }
      );
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={fake_summary}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.item}</a>}
            />
            <div>{item.value}</div>
          </List.Item>
        )}
      />
    );
  }
}
export default withRouter(FinanceSummary);
