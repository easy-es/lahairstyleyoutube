import React, {Component} from 'react';
import $ from "jquery";
import YoutubeVideosList from '../YoutubeVideosList/YoutubeVideosList.jsx'

 class YoutubeApi extends Component {
	
	constructor(props){
		super(props);
		this.getVids = this.getVids.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	callCredentitial() {
		$.get(
			this.state.apiUrl+"channels",
			{
				part:"contentDetails",
				forUsername:this.state.userChannel,
				key:this.state.key,
			}).then(data => this.getVids(data.items[0].contentDetails.relatedPlaylists.uploads));
	
	}

	getVids(channelId) {
		$.get(
			this.state.url+"playlistItems",
				{
					part:"snippet",
					key:this.state.key,
					playlistId: channelId,
					maxResults: 25
				}
		).then(data => this.setState({ listVids : this.jsonToObject(data.items)}));
	}

	getVidsFromDB() {
		$.get(
			"index.php/api/videos",
		).then(data => this.setState({ listVids : this.jsonToObject(data)}));
	}

	sendToDb(listVids) {

		for( var i = 0; i < listVids.length; i++)
		$.post(
			"index.php/api/video/create",
				{
					title: listVids[i].title,
					description: listVids[i].description,
					videoId : listVids[i].videoId,
					thumbnail : listVids[i].thumbnail,
					search : listVids[i].search
				},
			"json"
		);
	}

	jsonToObject(data) {

		String.prototype.sansAccent = function(){
	    var accent = [
	        /[\300-\306]/g, /[\340-\346]/g, // A, a
	        /[\310-\313]/g, /[\350-\353]/g, // E, e
	        /[\314-\317]/g, /[\354-\357]/g, // I, i
	        /[\322-\330]/g, /[\362-\370]/g, // O, o
	        /[\331-\334]/g, /[\371-\374]/g, // U, u
	        /[\321]/g, /[\361]/g, // N, n
	        /[\307]/g, /[\347]/g, // C, c
	    ];
	    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
	     
	    var str = this;
	    for(var i = 0; i < accent.length; i++){
	        str = str.replace(accent[i], noaccent[i]);
	    }
     
    	return str;
		}

		var vids = [];
		for (var i = 0; i < data.length; i++) {
			var isFromDB = data[i].hasOwnProperty('snippet');
			var title  = isFromDB ? data[i].snippet.title : data[i].title ;
			var videoId = isFromDB ? data[i].snippet.resourceId.videoId : data[i].videoId;
			var description = isFromDB ? data[i].snippet.description : data[i].description;
			var thumbnail = isFromDB ? data[i].snippet.thumbnails.default.url : data[i].thumbnail;
			var search = null; 
			//description.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
			
			var obj = {
				title: title,
				videoId : videoId,
				description : description,
				thumbnail : thumbnail,
				search : title+description //search.sansAccent()
			};

			vids.push(obj);
		}

		this.props.updateList(vids,true);
	}

	readParameters() {
		var path = require('path');
		$.getJSON('data.json').done(
			data => this.setState({
				key: data.key,
				apiUrl : data.apiUrl,
				userChannel : data.userChannel
			})
		);
	}

	handleClick(e) {
		e.preventDefault();
		this.callCredentitial();
		if (this.props.listVids != null)
			this.sendToDb(this.props.listVids);
	}
 	// no need to wait react component to be mounted
 	componentWillMount () {
 		this.readParameters();
 		this.getVidsFromDB();
 	}

	render() {
		var message = null;
		var videoList = null;

		videoList = (this.props.listVids != null) ? <YoutubeVideosList listVids={this.props.listVids} /> : null;

		return (
			
			<div> 
			{message} 
			<div>
				<button type="button" className="btn" onClick={this.handleClick}> Importer video de Youtube </button>
			</div>
				<div>
					{videoList}
				</div>
			</div>
		);
	}
}

export default YoutubeApi;
