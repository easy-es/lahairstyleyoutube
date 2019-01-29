import React , {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.search = this.search.bind(this);
		this.filterDate = this.filterDate.bind(this);
		this.state = {
			publicationDates : null,
			americanFormat : "YYYY-MM-DD",
			EuFormat : "DD-MM-YYYY"
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

	filterDate(e) {
		var listVids =  null;
		const firstDay = moment(e.target.value,this.state.americanFormat).startOf('month');
		const lastDay = moment(e.target.value,this.state.americanFormat).endOf('month');
		
		listVids = this.props.initListVids.filter(function(el) {
			// can't use the state in this scope ? 
			var publication = moment(el.publication,"YYYY-MM-DD");
			if((publication.isAfter(firstDay)) && (publication.isBefore(lastDay))) 
			return el;
		});	

		if ( (listVids == null) || (listVids == 0) ) {
			//TODO ajax call 
		} else {
			this.props.updateList(listVids, false);
		}
	}

	lazyLoading(value){
		var tab = this.props.initListVids.filter(function(el) {
			return el.search.toLowerCase().indexOf(value.toLowerCase()) > -1;
		});
		this.props.updateList(tab, false);
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
	}

	render() {
		var datePublication = null;
		
		if (this.state.publicationDates != null) {	
			datePublication= this.state.publicationDates.map(
				(i) => <option value={i.datepublication} key={i.datepublication} > {i.formatDate} </option> );
		} 

		return (
			<div className="row">
				<div className="input-group mt-3">
	    			<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.search.bind(this)} />
	    			<div className="input-group-append">
		    			<select onChange={this.filterDate.bind(this)}>
		    				{datePublication}
		    			</select>
	    				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
	  				</div>
	  			</div>
  			</div>
		)
	}
}