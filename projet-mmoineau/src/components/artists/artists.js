import React from 'react';
import PropTypes from 'prop-types';
import styles from './artists.scss';

const artists = props => (
	<div>This is a component called artists.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class artists extends React.Component {
//   render() {
//     return <div>This is a component called artists.</div>;
//   }
// }

const artistsPropTypes = {
	// always use prop types!
};

artists.propTypes = artistsPropTypes;

export default artists;
