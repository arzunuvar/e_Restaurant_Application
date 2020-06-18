import React, { Component } from 'react';
import BaseComponent from './Base/BaseComponent';

class Loader extends BaseComponent {
	render() {
		return (
			<div id="loaderContainer" ref="Loader">
				<div className="loader" />
			</div>
		);
	}
}

export default Loader;