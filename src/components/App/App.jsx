import React, { Component } from 'react';
import YoutubeApi from '../YoutubeApi/YoutubeApi.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx'

export default class App extends Component {

  	constructor(props) {
  		super(props);

  		this.state = {
  			initListVids:null,
  			listVids : null,
  			countListVids : null
  		}

  		this.updateList = this.updateList.bind(this);
  	}

	updateList(listVids , init) {

		if( init == true ) {
			this.setState({
				initListVids : listVids,
				listVids : listVids
			});
		} else {
			this.setState({
				listVids : listVids
			});
		}
	}

	render() {

	    return (
	    	<div className="container">
	    		<SearchBar 
		    		listVids = {this.state.listVids} 
		    		initListVids = {this.state.initListVids}
		    		updateList = {this.updateList.bind(this)}  />
	        	<YoutubeApi updateList = {this.updateList.bind(this)} listVids = {this.state.listVids} />
	      </div>
	    );
	  }
}
