import React , {Component} from 'react';
import $ from 'jquery';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.search = this.search.bind(this);
		this.state = {
			publicationDates : null
		}
	}

	search(e) {
		//TODO cleaning words (special char , accent)
		//TODO lazy loading in json parameters file
		if(e.target.value.length >= 3 && this.props.initListVids.length < 1000 ) {
			this.lazyLoading(e.target.value);		
		} 
		if (e.target.value.length == 0 ){
			this.props.updateList(this.props.initListVids, true);
		}      
	}

	lazyLoading(value){
		var tab = this.props.initListVids.filter(function(el) {
			return el.search.toLowerCase().indexOf(value.toLowerCase()) > -1;
		});
		this.props.updateList(tab, false);
		this.getMinMax(tab);
	}
  

	getMinMax(tab) {
		if (tab != null ) {	
			tab = tab.map(function(e) {
				return e.publication;
			});
			this.setState({
				min : Math.max(tab),
				max : Math.min(tab)
			});
		}
	}

	getPublicationDate() {
		$.get(
			"index.php/api/date",
		).then(data => {
				this.setState({
					publicationDates : data
				});
			}
		);
	}

	componentDidMount() {
		this.getPublicationDate();
		this.getMinMax(this.props.listVids);
	}

	render() {
		var datePublication = null;
		
		if (this.state.publicationDates != null) {	
			datePublication= this.state.publicationDates.map(
				(i) => <option value={i.datepublication} key={i.datepublication} > {i.datepublication} </option> );
		} 

		return (
			<div className="row">
				<div className="input-group mt-3">
	    			<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.search.bind(this)} />
	    			<select>
	    				{datePublication}
	    			</select>
	    			<div className="input-group-append">
	    				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
	  				</div>
	  			</div>
  			</div>
		)
	}
}