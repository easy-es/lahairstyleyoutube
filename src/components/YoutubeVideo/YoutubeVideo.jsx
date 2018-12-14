import React , {Component} from 'react';
import moment from 'moment';
import $ from 'jquery';

class YoutubeVideo extends Component {
	constructor(props) {
		super(props);
		this.delete = this.delete.bind(this);
	}

	delete(id) {
		$.ajax({
			url:'index.php/api/video/delete',
			data:{videoId: id},
			type:'DELETE'
		});
		//reference to delete in array javascript
		this.props.dia(id);
	}

	render() {

		return(
			<div className="col-3">
				<div className="">
					<img  className="" src={this.props.vid.thumbnail} alt={this.props.vid.title} />
					<div className="">
						<h5 className=""> {this.props.vid.title} </h5>
						<div className="">{ moment(this.props.vid.publication,"YYYY-MM-DD").format("DD-MM-YYYY")}</div>
						<div className="text-truncate">{this.props.vid.description}</div>
					</div>
					<button onClick={() => this.delete(this.props.vid.videoId)}> Supprimer</button>
				</div>
			</div>
		);
	}
}

export default YoutubeVideo;