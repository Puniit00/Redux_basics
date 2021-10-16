const redux = require('redux');
const thunk = require('redux-thunk').default
const axios = require('axios');

const createdtore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

//Defining the initial state
const initialState= {
    Loading : true,
    users : [],
    error : ''
}

const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';

//Action
const fetchUserSuccess = (payload)=>{
    return{
        type:FETCH_USER_SUCCESS,
        payload
    }
}

const fetchUserFailure = (payload)=>{
    return{
        type:FETCH_USER_FAILURE,
        payload
    }
}

const fetchUserRequest = ()=>{
    return{
        type:FETCH_USER_REQUEST
    }
}

//reducer
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loading : true
            }

            case FETCH_USER_SUCCESS:
                return{
                    ...state,
                    users: action.payload,
                    error : ''
                }
            case FETCH_USER_FAILURE:
                return{
                    ...state,
                    users:[],
                    error : action.payload
                }
    }
}

//action creator
const fetchUsers= ()=>{
    return function(dispatch){
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            // response will return array of users
            const users = response.data.map((item)=>item.id);
            dispatch(fetchUserSuccess(users))
        }).catch((error)=>{
            const errors = error.message;
            dispatch(fetchUserFailure(errors))
        })
    }
}

const store = createdtore(reducer,applyMiddleware(thunk));
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(fetchUsers());