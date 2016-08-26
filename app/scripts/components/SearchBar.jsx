import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import fetch from 'isomorphic-fetch';
import GoogMap from './GoogMap.jsx';
import itemActions from '../actions/itemActions.js';



function getSuggestionValue(suggestion) { // when suggestion is selected, this function tells
  return suggestion._source.title;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span className="suggestion_span">{suggestion._source.title}</span>
  );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      latLng: '0,0',
      radius: 50,
      value: '',
      suggestions: [],
      currentPage: 0,
    };
    this.changeCoords = this.changeCoords.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.getPage = this.getPage.bind(this);
  }
  getSuggestions(value) {
    var context = this;
    var url = 'https://mysterious-coast-57298.herokuapp.com/listings/titlesearch?title='+value;
    fetch(url)
    .then(res=> res.json())
    .then(data=>{
      context.setState({
        suggestions : data,
      });
    })
  }

  suggestChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsUpdateRequested({ value }) {
    var context = this;
    context.getSuggestions(value);
  }

  toggleModal() {
    this.setState({
      modalState: !this.state.modalState,
    });
  }

  changeCoords(latitude, longitude) {
    this.setState({
      latLng: `${latitude},${longitude}`,
    });
  }

  handleSlide(e) {
    this.setState({
      radius: e.target.value,
    });
  }

  getPage(searchHitNum) {
    const nextQuery = this.props.lastQuery;
    nextQuery.startFrom = searchHitNum;
    this.props.doElasticSearch(nextQuery);
  }

  render() {
    let { userZip } = this.props;
    let keywords, category;
    let zip;
    let { value, suggestions } = this.state;
    let inputProps = {
      value,
      onChange: this.suggestChange.bind(this),
    };

    return (
      <div>
        <div className="search_bar_container">
          <div className="search_holder">
            <form
              className="search_form"
              onSubmit={(e) => {
                e.preventDefault();
                const data = {
                  keywords: this.state.value,
                  coordinates: this.state.latLng,
                  distance: this.state.radius,
                  startFrom: 0,
                };
                console.log(data);
                this.props.doElasticSearch(data);
                this.state.value = '';
              }}
            >
              <div className="map_button" onClick={() => { this.toggleModal(); }}>
                <img src="location_white.png" height="36px" width="36px"/>
              </div>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                shouldRenderSuggestions = {function shouldRenderSuggestions(value) {
                  return value.trim().length > 2;}
                }
              />
              <button className="search_button">search</button>
            </form>
          </div>
          <div className="pagination">
            {
              this.props.searchHits.map((searchHitNum, i) => (
                <a
                  className={this.state.currentPage === i ? 'page_number current' : 'page_number'}
                  onClick={() => {
                    this.setState({
                      currentPage: i,
                    });
                    this.getPage(searchHitNum);
                  }}
                  key={i}
                >{i + 1}</a>
              ))
            }
          </div>
        </div>
        {
          this.state.modalState ?
          (<div className='map_modal modal_on'>
            <div className="map_modal_content">
              <input type="range" name="miles" min="0" max="100" onChange={(e) => { this.handleSlide(e); }} />
              <span>{this.state.radius}(km)</span>
              <GoogMap changeCoords={this.changeCoords} />
            </div>
          </div>)
          : ''
        }
      </div>
    );
  }
}

SearchBar.propTypes = {
  commitSearch: React.PropTypes.func,
  searchHits: React.PropTypes.array,
  lastQuery: React.PropTypes.object,
  doElasticSearch: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    userZip: state.users.zip,
    searchHits: state.searchHits,
    lastQuery: state.lastQuery,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    commitSearch: (query) => {
      dispatch(itemActions.searchItem(query));
    },
    doElasticSearch: (query) => {
      dispatch(itemActions.elasticSearch(query));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
