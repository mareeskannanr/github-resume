import React, { Component } from 'react';
import axios from 'axios';

import LoadingOverlay from 'react-loading-overlay';
import { RingLoader } from 'react-spinners'

import UserNotFound from './UserNotFound';
import Profile from './Profile';

class App extends Component {

  state = {
    userName: '',
    userNotFound: false,
    exception: false,
    userObject: '',
    loader: false
  };

  generateResume() {
    this.setState({
      exception: false,
      loader: true
    });

    axios.get('https://api.github.com/users/' + this.state.userName)
      .then(response => this.setState({userObject: response.data}))
      .catch(error => {
        if(error && error.response && error.response.status === 404) {
          this.setState({
            userNotFound: true,
            loader: false
          });
        } else {
          this.setState({
            exception:true,
            loader: false
          });
        }
      });
  }

  reset() {
    this.setState({
      userName: '',
      userNotFound: false,
      loader: false,
      userObject: '',
      exception: false
    });
  }


  render() {
    return (
      <LoadingOverlay active={this.state.loader} spinner={<RingLoader />} styles={{
        overlay: (base) => ({
          ...base,
          backgroundColor: 'rgba(236, 232, 232, 0.7)',
          height: '95vh'
        })
      }}>
        <div id="app">
          <div className="alert alert-dark" role="alert">
            <h2>
              <span className="fab fa-github"></span> Github Resume
              { this.state.userObject &&
                <button type='button' className='btn btn-primary float-right' onClick={() => this.reset()}>
                  <span className='fas fa-arrow-left'></span> Go Back
                </button>
              }
            </h2>
          </div>
          { !this.state.userNotFound && !this.state.userObject && 
            <div className="col-12">
              <div className='col-12 d-flex justify-content-center align-items-center mt-40'>
                <div className='col-2'></div>
                <div className='col-6'>
                  <input type="text" className="form-control" id="gitHubProfile" placeholder="Enter Your Github UserName" onChange={e => this.setState({userName: e.target.value})} />
                </div>
                <div className='col-2'>
                  <button type="button" className="btn btn-success mt-20" onClick={() => this.generateResume()} disabled={!this.state.userName}>
                    <span className="fas fa-file"></span> Generate
                  </button>
                </div>
                <div className='col-2'></div>
              </div>
                { this.state.exception && 
                  <div className='col-12 text-center mt-15' style={{"marginTop": "20px"}}>
                      <h5 className='text-danger'>Sorry, something went wrong! Please Try Again.</h5>
                  </div>
                }
            </div>
          }
          { this.state.userNotFound && 
            <div className="col-12 mt-30">
              <UserNotFound tryAgain={() => this.reset()} />
            </div>
          }
          {
            this.state.userObject &&
            <div className="col-12">
              <Profile tryAgain={() => this.reset()} user={this.state.userObject} setLoader={value => this.setState({loader: value})} />
            </div>
          }
        </div>
      </LoadingOverlay>
    );
  }
}

export default App;
