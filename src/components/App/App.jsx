import React, { Component } from 'react';
import YoutubeApi from '../YoutubeApi/YoutubeApi.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx'

export default class App extends Component {

  	constructor(props) {
  		super(props);

  		this.state = {
  			listVids : null,
  			countListVids : null
  		}

  		this.updateList = this.updateList.bind(this);
  	}

	updateList(listVids) {
		this.setState({
			listVids : listVids,
			countListVids : listVids.length
		});
	}

	render() {
	    return (
	    	<div>
	    		<SearchBar listVids = {this.state.listVids} countListVids={this.state.countListVids} updateList = {this.updateList.bind(this)}  />
	        	<YoutubeApi updateList = {this.updateList.bind(this)} listVids = {this.state.listVids} />
	      </div>
	    );
	  }
}
