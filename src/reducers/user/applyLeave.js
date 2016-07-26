import Immutable from 'immutable'

let initialState = {
    "status_message" : ""
}

export function applyLeave( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_LEAVE_SUCCESS' ){
        return state.set( 'status_message' , action.payload )
    }else if( action.type == 'ACTION_LEAVE_SUCCESS' ){
        return state.set( 'status_message' ,  action.payload)
    }else if( action.type == 'ACTION_LEAVE_SUCCESS' ){
        return state.set( 'status_message' , action.payload )
    }else{
        return state.set( 'status_message' , "" )
    }
}