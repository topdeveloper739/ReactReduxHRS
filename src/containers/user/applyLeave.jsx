import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import ApplyLeaveForm from '../../components/leaves/ApplyLeaveForm'
import { CONFIG } from '../../config/index'
import * as actions_login from '../../actions/login/index'
import * as actions_apply_leave from '../../actions/leave/applyLeave'
import * as actions_usersList from '../../actions/user/usersList'


import UserMonthlyAttendance from '../../components/attendance/UserMonthlyAttendance'
import UsersList from '../../components/attendance/UsersList'

class ApplyLeave extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
            "defaultUserDisplay" : "",
            "selected_user_name" : "",
            "selected_user_image" : "",
            "selected_user_jobtitle" : "",
            "selected_user_id" : "",
            "show_status_message":true
        }
        this.onUserClick = this.onUserClick.bind( this )
    }
    componentDidMount(){
    }
    componentWillMount(){
    }
    componentWillReceiveProps( props ){
      window.scrollTo(0, 0);
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Guest' ){
                this.props.router.push('/home');    
            }else{
              if(props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.ADMIN){
                if( this.state.defaultUserDisplay  == '' ){
                  props.onUsersList()
                }
              }
            }
        }
    }
    componentDidUpdate(){
      if(this.props.logged_user.role == CONFIG.ADMIN || this.props.logged_user.role == CONFIG.ADMIN){
        if( this.state.defaultUserDisplay  == '' ){
          if( this.props.usersList.users.length > 0 ){
              let firstUser = this.props.usersList.users[0]
              let defaultUserId = firstUser.user_Id
              this.onUserClick( defaultUserId )
          }
        }
      }
    }
    onUserClick( userid ){
      let selected_user_name = ""
      let selected_user_image = ""
      let selected_user_jobtitle = ""
      let selected_user_id = ""
      
      if( this.props.usersList.users.length > 0 ){
        let userDetails = _.find( this.props.usersList.users, { 'user_Id' : userid } )
        if( typeof userDetails != 'undefined' ){
          selected_user_name = userDetails.name
          selected_user_image = userDetails.slack_profile.image_192
          selected_user_jobtitle = userDetails.jobtitle
          selected_user_id = userDetails.user_Id
        }
      }
      this.setState({
            "defaultUserDisplay" : userid,
            "selected_user_name" : selected_user_name,
            "selected_user_image" : selected_user_image,
            "selected_user_jobtitle" : selected_user_jobtitle,
            "selected_user_id" : selected_user_id,
            "show_status_message":false
        })
    }
    
    render(){

      let status_message = ""
      if( this.props.applyLeave.status_message != '' && this.state.show_status_message == true){
        status_message = <span className="label label-lg primary pos-rlt m-r-xs">
          <b className="arrow left b-primary"></b>{this.props.applyLeave.status_message}</span>
      }

      let mainDivs = (this.props.logged_user.role == 'Admin' || this.props.logged_user.role == 'Hr' ?
        <div className="row">
            <div className="col-md-2">
                <UsersList users = { this.props.usersList.users } selectedUserId={this.state.selected_user_id} onUserClick = { this.onUserClick } {...this.props } />
            </div>
            <div className="col-md-10">
              <div className="box">
                <div className="p-a text-center">
                  <a href="" className="text-md m-t block">{this.state.selected_user_name}</a>
                  <p><small>{this.state.selected_user_jobtitle}</small></p>
                </div>
              </div>
              <div className="row no-gutter b-t box">
                <div className="col-xs-12 b-r box">
                  <ApplyLeaveForm forAdmin={true} selectedUserId={this.state.selected_user_id} {...this.props}/>
                </div>
              </div>
            </div>
            </div>:
            <div className="row">
            <div className="col-md-12">
              <div className="row no-gutter b-t box">
                <div className="col-xs-12 b-r box">
                  <ApplyLeaveForm forAdmin={false} {...this.props}/>
                </div>
              </div>
            </div>
            </div>)

        return(
        	<div >
          <Menu {...this.props }/>
            <div id="content" className="app-content box-shadow-z0" role="main">
              
              <div className="app-header white box-shadow">
                <div className="navbar">
                  <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                    <i className="material-icons">&#xe5d2;</i>
                  </a>
                  <div className="navbar-item pull-left h5" id="pageTitle">Apply Leave &nbsp;&nbsp;&nbsp; {status_message}</div>
                </div>
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
              </div>

              <div className="app-body" id="view">
                <div style={{'paddingTop':'20px'}}>
                  {mainDivs}
                </div>
              </div>
            </div>

    </div>

        )
    }
}


ApplyLeave.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

function mapStateToProps( state ){
	return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        usersList : state.usersList.toJS(),
        applyLeave : state.applyLeave.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onApplyLeave : ( from_date, to_date, no_of_days, reason, userId ) => {
            return dispatch( actions_apply_leave.apply_leave( from_date, to_date, no_of_days, reason, userId  ))
        },
        onDaysBetweenLeaves : ( startDate, endDate ) => {
          return dispatch( actions_apply_leave.getDaysBetweenLeaves( startDate, endDate  ))
        },
        onUsersList : () => {
          return dispatch( actions_usersList.get_users_list(  ))  
        },
    }
}

const VisibleApplyLeave = connect(
  mapStateToProps,
  mapDispatchToProps
)( ApplyLeave )

const RouterVisibleApplyLeave = withRouter( VisibleApplyLeave )

export default RouterVisibleApplyLeave