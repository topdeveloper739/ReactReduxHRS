import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import * as jwt from 'jwt-simple'

import {show_loading, hide_loading} from '../generic/frontend'

import * as actions_listLeaves from '../../actions/leave/listLeaves'

export const ACTION_LEAVE_STATUS_CHANGE_SUCCESS = "ACTION_LEAVE_STATUS_CHANGE_SUCCESS"
export const ACTION_LEAVE_STATUS_CHANGE_FAIL = "ACTION_LEAVE_STATUS_CHANGE_FAIL"
export const ACTION_LEAVE_STATUS_CHANGE_ERROR = "ACTION_LEAVE_STATUS_CHANGE_ERROR"

export function leave_status_change_success( data ){
	return createAction( ACTION_LEAVE_STATUS_CHANGE_SUCCESS )( data )
}

export function leave_status_change_fail( data ){
	return createAction( ACTION_LEAVE_STATUS_CHANGE_FAIL )( data )
}

export function leave_status_change_error( err ){
	return createAction( ACTION_LEAVE_STATUS_CHANGE_ERROR )( data )
}

function async_changeLeaveStatus( leaveid, newstatus, messagetouser ){
	return fireAjax( 'POST', '', {
		'action' : 'change_leave_status',
		'leaveid' : leaveid,
		'newstatus' : newstatus,
		'messagetouser' : messagetouser
	})
}

export function changeLeaveStatus( leaveid, newstatus, messagetouser ){

	return function (dispatch,getState){
		
		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_changeLeaveStatus( leaveid, newstatus, messagetouser ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( leave_status_change_success( json.data.message ) )
						dispatch( actions_listLeaves.getAllLeaves() )
		 			}else{
		 				dispatch( leave_status_change_fail( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( leave_status_change_error( 'error occurs' ) )
				}
			)
			
		})

	}
    
}