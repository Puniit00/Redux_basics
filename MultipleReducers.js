const redux = require('redux')

const createStore = redux.createStore;
const combinereducer = redux.combineReducers;

//Action
const BUY_FRUITS = 'BUY_FRUIT';
const BUY_VEGETABLES = 'BUY_VEGETABLES';

function buy_fruits(){
    return{
        type:BUY_FRUITS,
        info:"First redux action"
    }
}

function buy_vegetables(){
    return{
        type:BUY_VEGETABLES
    }
}

//multiple Reducer => function(previousState,action)

const Fruits_initialState={
    Num_Of_Fruits : 10
}

const Vegetables_initialState={
    Num_Of_Vegetables : 20
}

const Fruitreducer = (state=Fruits_initialState, action)=>{
    switch(action.type){
        case BUY_FRUITS : return{
            ...state,
            Num_Of_Fruits : state.Num_Of_Fruits-1
        }

        default : return state
    }
}

const Vegetablereducer = (state=Vegetables_initialState, action)=>{
    switch(action.type){
        case BUY_VEGETABLES : return{
            ...state,
            Num_Of_Vegetables : state.Num_Of_Vegetables-1
        }

        default : return state
    }
}

// store

const rootReducer = combinereducer({
    fruit : Fruitreducer,
    vegetable : Vegetablereducer
}) //combinereducer takes an object which allowes user to store multiple reducers

const store = createStore(rootReducer) // redux store holding the application state. (1st task)

console.log('initial state', store.getState()) // getting the current state of app (2nd task)

const unsubscribe = store.subscribe(()=>console.log('update state', store.getState())) // subscribe to the event that allows changes in the state(3rd task)

store.dispatch(buy_fruits()) // allow state to be updated (4rth task)
store.dispatch(buy_fruits()) 
store.dispatch(buy_fruits())
store.dispatch(buy_vegetables()) 
store.dispatch(buy_vegetables())  

unsubscribe()// unsubscribe the listener (5th task)