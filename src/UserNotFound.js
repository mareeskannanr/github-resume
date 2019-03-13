import React from 'react';

let UserNotFound = prop => (
    <div className='row'>
        <div className='col-8 offset-2 d-flex justify-content-center align-items-center'>
            <div className="card">
                <div className="card-header">
                    <h3>
                        <span className='fas fa-user-times'></span>&nbsp;&nbsp; USER NOT FOUND
                    </h3>
                </div>
                <div className="card-body">
                    <h5 className="card-title">The user you requested was not found. Please check your spelling and try again.</h5>
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='button' className='btn btn-primary' onClick={() => prop.tryAgain()}>
                        <span className='fas fa-arrow-left'></span> Try Again
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default UserNotFound;