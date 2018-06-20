import React from 'react';
import { Steps, Button, message } from 'antd';
import './AddStepForm.css';

import StepOneFrom from './StepOneFrom';

const Step = Steps.Step;

const steps = [
  {
    title: 'First',
    content: <StepOneFrom />,
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

class AddStepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          {steps[this.state.current].content}
          {/* {this.state.current === 0 && <StepOneFrom />} */}
        </div>
        <div className="steps-action">
          {this.state.current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {this.state.current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}
export default AddStepForm;
