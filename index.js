const redux = require('redux')

const createStore = redux.createStore

//Action
const BUY_FRUITS = 'BUY_FRUIT';

function buy_fruits(){
    return{
        type:BUY_FRUITS,
        info:"First redux action"
    }
}

//Reducer => function(previousState,action)

const initialState={
    Num_Of_Fruits : 10
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case BUY_FRUITS : return{
            ...state,
            Num_Of_Fruits : state.Num_Of_Fruits-1
        }

        default : return state
    }
}

// store

const store = createStore(reducer) // redux store holding the application state. (1st task)

console.log('initial state', store.getState()) // getting the current state of app (2nd task)

const unsubscribe = store.subscribe(()=>console.log('update state', store.getState())) // subscribe to the event that allows changes in the state(3rd task)

store.dispatch(buy_fruits()) // allow state to be updated (4rth task)
store.dispatch(buy_fruits()) 
store.dispatch(buy_fruits()) 

unsubscribe()// unsubscribe the listener (5th task)