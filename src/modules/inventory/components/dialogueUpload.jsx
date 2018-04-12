// import React from 'react';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import style from '../../../styles/inventory/manageInventory.scss';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
  import React from 'react';
  import * as _ from 'lodash';
  import Dialog from 'material-ui/Dialog';
  import {notify} from 'src/services/notify';
  import {getToken} from 'src/services/generic';
  import {CONFIG} from 'src/config/index';

  export default class DialogUpload extends React.Component {

    constructor (props) {
      super(props);
      this.state = {
        open:       false,
        id:         '',
        user_token: ''
      };
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
    }
  
    componentWillReceiveProps (props) {
      this.setState({user_token: getToken()});
    }
  
    handleOpen (id) {
      this.setState({open: true, id: id});
    }
    handleClose () {
      this.setState({open: false});
    }
  
    callUpdateDocuments (e) {
      let docProof = this.refs.file.value;
      let stop = false;
      if (docProof === '') {
        stop = true;
        notify('Please select a file');
      }
      if (stop) {
        e.preventDefault();
      }
    }
  
    render () {
     // let page_url = window.location.href;
     // console.log(page_url,'pppppppppppppppppp');
      console.log(CONFIG,'KKKKKKKKKKK');
      
      // className="dialog-content"
      return (
        <div className="row">
          <Dialog title="Upload Leave Document"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            contentClassName="dialog-content" 
            autoScrollBodyContent>
            <div>
              <form action={CONFIG.upload_leave_url} method="POST" encType="multipart/form-data">
                {/* <input type="hidden" name="token" value={this.state.user_token} /> */}
                {/* <input type="hidden" name="leaveid" value={this.state.id} /> */}
                {/* <input type="hidden" name="page_url" value={page_url} /> */}
                <div className="form-group">
                  <label>Attachment</label>
                  <input type="file" className="form-control" ref="file" name="docProof" />
                </div>
                <div className="form-group">
                  <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo" onClick={(e) => {
                    this.callUpdateDocuments(e);
                  }} />
                </div>
              </form>
            </div>
          </Dialog>
        </div>
      );
    }
  }
  
  
  