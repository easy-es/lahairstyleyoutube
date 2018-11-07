import React , {Component} from 'react';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.search = this.search.bind(this);
	}

	search(e) {
		//TODO cleaning words (special char , accent)
		//TODO lazy loading in json parameters file
		if(e.target.value.length >= 3 && this.props.initListVids.length < 1000 ) {
			console.log(e.target.value.length);
			this.lazyLoading(e.target.value);		
		} 
		if (e.target.value.length == 0 ){
			this.props.updateList(this.props.initListVids, true);
		}
        
	}

	lazyLoading(value){
		console.log(value);
		var tab = this.props.initListVids.filter(function(el) {
			return el.search.toLowerCase().indexOf(value.toLowerCase()) > -1;
		});
		this.props.updateList(tab, false);
	}

	render() {
		return (
			<div className="row">
				<div className="center-block">
					<form className="form-inline">
		    			<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.search.bind(this)} />
		    			<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
		  			</form>
	  			</div>
  			</div>
			)
	}
}