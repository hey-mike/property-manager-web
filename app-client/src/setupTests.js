import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { expect } from 'chai';
Enzyme.configure({ adapter: new Adapter() });

// mock local storage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
const middlewares = [thunk];
global.store = configureStore(middlewares);
global.localStorage = localStorageMock;
global.expect = expect;
