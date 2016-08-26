import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';


const baseUrl = 'http://localhost:3000'; //'http://discollect.net' ||
const searchUrl = 'https://mysterious-coast-57298.herokuapp.com/listings';

const optimisticSetItems = (items) => (
  {
    type: 'GET_ITEMS',
    items,
  }
);

const optimisticIndivItem = (item) => (
  {
    type: 'SET_CURR_ITEM',
    current: item,
  }
);


const itemActions = {
  updateListingTakerRating: (listingId, rating) => (
    (dispatch) => {
      const details = {
        listingId: listingId,
        rating: rating,
      };
      const url = baseUrl + '/api/updateListingTakerRating';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(details),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        browserHistory.push('/')
        browserHistory.push('/dashboard')
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  updateListingGiverRating: (listingId, rating) => (
    (dispatch) => {
      const details = {
        listingId: listingId,
        rating: rating,
      };
      const url = baseUrl + '/api/updateListingGiverRating';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(details),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        browserHistory.push('/')
        browserHistory.push('/dashboard')
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  getSQLListings: (query) => (
    (dispatch) => {
      const url = baseUrl + '/api/getFilteredListings';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        // console.log('!!!!!!!!!', response);
        dispatch({
          type: 'GET_ITEMS',
          items: response,
        });
        dispatch({
          type: 'SET_SEARCH_HITS',
          payload: 1,
        })
        // browserHistory.push('/');
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),


  getIndividualListing: (id) => (
    (dispatch) => {
      const url = baseUrl + '/api/listing?id=' + id;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        dispatch(optimisticIndivItem(response));
        // then reroute to the listing page that this item needs
        return response.id;
      })
      .then((id) => {
        browserHistory.push('/listing'+id);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  postNewListing: (listingData) => (
    (dispatch) => {
      const photoUrl = 'http://photohelper.herokuapp.com/api/createNewListing';
      const url = baseUrl + '/api/createNewListing';
      if (!listingData.picReference) {
        dispatch(itemActions.postListingAfterPhoto(listingData));
      } else {
        const photoData = {
          title: listingData.title,
          picReference: listingData.picReference,
          filename: listingData.filename,
          filetype: listingData.filetype,
          giverId: listingData.giverId,
        };
        fetch(photoUrl, {
          method: 'POST',
          body: JSON.stringify(photoData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((response) => {
          listingData.picReference = response;
          dispatch(itemActions.postListingAfterPhoto(listingData));
        })
      }
    }
  ),

  postListingAfterPhoto: (data) => (
    (dispatch) => {
      const url = baseUrl + '/api/createNewListing';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        browserHistory.push('/');
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),

  searchItem: (query) => (
    (dispatch) => {
      dispatch({
        type: 'UPDATE_SEARCH_PARAMS',
        keywords: query.keywords || null,
        category: query.category || null,
        zip: query.zip || null,
      })
    }
  ),

  elasticSearch: (query) => (
    (dispatch) => {
      const url = searchUrl + '?keywords=' + query.keywords + '&category=all-categories' + '&coordinates=' + query.coordinates + '&distance=' + query.distance + 'km' + '&startFrom=' + query.startFrom;
      dispatch({
        type: 'SAVE_LAST_QUERY',
        payload: query,
      });
      // TODO TEMPLATE STRING
      fetch(url)
      .then((res) => res.json())
      .then((res) => {
        var hits = res.hits.total;
        var data = res.hits.hits.map(val=>{
          val._source.picReference = val._source.picreference;
          val._source.createdAt = val._source.createdat;
          return val._source;
        })
        // TODO NEW SETSTATE
        dispatch({
          type: 'SET_SEARCH_HITS',
          payload: hits
        });
        dispatch(optimisticSetItems(data));
        dispatch(itemActions.searchItem({}));
      })
      .catch(err => {
        console.log('Search Error: ', err);
      });
    }
  ),

  updateListingStatus: (details) => (
    (dispatch) => {
      const num = JSON.stringify(details);
      const url = baseUrl + '/api/update';
      fetch(url, {
        method: 'PUT',
        body: num,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        // dispatch(itemActions.getLatestListings());
        fetch(searchUrl + '/' + details.listingID, {
          method: 'DELETE',
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  closeListing: (listingID, userID) => (
    (dispatch) => {
      const url = baseUrl + '/api/closeListing';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ listingID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(res => {
        let active = [];
        let pending = [];
        let waiting = [];
        for (let item of res) {
          if (item.giverId === userID && item.status === 0) {
            active.push(item);
          } else if (item.giverId === userID && item.status === 1) {
            pending.push(item);
          } else if (item.takerId === userID && item.status === 1) {
            waiting.push(item);
          } else if (item.takerId === response.id && item.status === 2) {
            waiting.push(item);
          }
        }
        dispatch({
          type: 'GET_USERS_LISTINGS',
          active: active || [],
          pending: pending || [],
          waiting: waiting || [],
        });
        browserHistory.push('/');
        browserHistory.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),

  finalCloseListing: (listingID, userID) => (
    (dispatch) => {
      const url = baseUrl + '/api/finalCloseListing';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ listingID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(res => {
        let active = [];
        let pending = [];
        let waiting = [];
        for (let item of res) {
          if (item.giverId === userID && item.status === 0) {
            active.push(item);
          } else if (item.giverId === userID && item.status === 1) {
            pending.push(item);
          } else if (item.takerId === userID && item.status === 1) {
            waiting.push(item);
          } else if (item.takerId === response.id && item.status === 2) {
            waiting.push(item);
          }
        }
        dispatch({
          type: 'GET_USERS_LISTINGS',
          active: active || [],
          pending: pending || [],
          waiting: waiting || [],
        });
        browserHistory.push('/')
        browserHistory.push('/dashboard')
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),

  getUserHistory: (userId) => (
    (dispatch) => {
       const url = baseUrl + '/api/getOldListings';
      fetch(url, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({userId: userId}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        dispatch({
          type: 'GET_USER_HISTORY',
          history: response,
        });
        browserHistory.push('/history'+userId)
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  getUsersListings: (id) => (
    (dispatch) => {
      const url = baseUrl + '/api/getUsersListings?id=' + id;
      fetch(url, {
        credentials: 'same-origin',
      })
      .then((res) => res.json())
      .then((response) => {
        let active = [];
        let pending = [];
        let waiting = [];
        for (let item of response.items) {
          if (item.giverId === response.id && item.status === 0) {
            active.push(item);
          } else if (item.giverId === response.id && item.status === 1) {
            pending.push(item);
          } else if (item.takerId === response.id && item.status === 1) {
            waiting.push(item);
          } else if (item.takerId === response.id && item.status === 2) {
            waiting.push(item);
          }
        }
        dispatch({
          type: 'GET_USERS_LISTINGS',
          active: active || [],
          pending: pending || [],
          waiting: waiting || [],
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }),

  removeListing: (listingID) => (
    (dispatch) => {
      const url = baseUrl + '/api/removeListing?listingID='+listingID;
      fetch(url, {
        method: 'DELETE',
      })
      .then(res=> {
        browserHistory.push('/')
        browserHistory.push('/dashboard')
         fetch(searchUrl + '/' + listingID, {
          method: 'DELETE',
        })
      })
    }
  ),

};

export default itemActions;
