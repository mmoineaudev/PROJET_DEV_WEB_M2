import React from 'react';
import { shallow, render, mount } from 'enzyme';
import mainPage from './mainPage';

describe('mainPage', () => {
  let props;
  let shallowmainPage;
  let renderedmainPage;
  let mountedmainPage;

  const shallowTestComponent = () => {
    if (!shallowmainPage) {
      shallowmainPage = shallow(<mainPage {...props} />);
    }
    return shallowmainPage;
  };

  const renderTestComponent = () => {
    if (!renderedmainPage) {
      renderedmainPage = render(<mainPage {...props} />);
    }
    return renderedmainPage;
  };

  const mountTestComponent = () => {
    if (!mountedmainPage) {
      mountedmainPage = mount(<mainPage {...props} />);
    }
    return mountedmainPage;
  };  

  beforeEach(() => {
    props = {};
    shallowmainPage = undefined;
    renderedmainPage = undefined;
    mountedmainPage = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
