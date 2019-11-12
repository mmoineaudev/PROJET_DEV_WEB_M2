import React from 'react';
import { shallow, render, mount } from 'enzyme';
import artists from './artists';

describe('artists', () => {
  let props;
  let shallowartists;
  let renderedartists;
  let mountedartists;

  const shallowTestComponent = () => {
    if (!shallowartists) {
      shallowartists = shallow(<artists {...props} />);
    }
    return shallowartists;
  };

  const renderTestComponent = () => {
    if (!renderedartists) {
      renderedartists = render(<artists {...props} />);
    }
    return renderedartists;
  };

  const mountTestComponent = () => {
    if (!mountedartists) {
      mountedartists = mount(<artists {...props} />);
    }
    return mountedartists;
  };  

  beforeEach(() => {
    props = {};
    shallowartists = undefined;
    renderedartists = undefined;
    mountedartists = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
