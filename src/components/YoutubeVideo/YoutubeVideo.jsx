import React , {Component} from 'react';

class YoutubeVideo extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return(
			<div className="col-3">
				<div className="">
					<img  className="" src={this.props.vid.thumbnail} alt={this.props.vid.title} />
					<div className="">
						<h5 className=""> {this.props.vid.title} </h5>
						<div className="text-truncate">{this.props.vid.description}</div>
					</div>
				</div>
			</div>
		);
	}

}

export default YoutubeVideo;