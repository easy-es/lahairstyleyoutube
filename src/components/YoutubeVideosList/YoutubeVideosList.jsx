import React, {Component} from 'react';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo.jsx';

class YoutubeVideosList extends Component {
	constructor(props) {
		super(props);
	}

	render() 
	{
		var listVideos = this.props.listVids.map((i) => <YoutubeVideo vid={i} key={i.videoId} /> );
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