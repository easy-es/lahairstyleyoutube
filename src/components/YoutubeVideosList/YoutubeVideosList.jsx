import React, {Component} from 'react';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo.jsx';

class YoutubeVideosList extends Component {
	constructor(props) {
		super(props);
		this.deleteInArray = this.deleteInArray.bind(this);
	}
	/**
	* (dia) Delete from the react dom
	*/
	deleteInArray(id) {
		var tab = this.props.listVids;
		var i =0;

		//TODO use undersore.js findWhere function 
		for (i = 0; i <= tab.length; i++) {
			if (tab[i].videoId == id) {
				 this.props.updateList(tab.splice(i));
			}
		}
	} 

	render() 
	{
		var listVideos = this.props.listVids.map(
			(i) => <YoutubeVideo vid={i} key={i.videoId} dia = {this.deleteInArray} /> );
		return (
			<div className="container-fluid">
				<div className="row">
					{listVideos}
				</div>
			</div>
		)
	}
}

export default YoutubeVideosList;