import React from 'react';

let Repository = props => (
    <div className='col-12'>
        <div className="card">
            <div className="card-header">
                <h4>
                    <span className='fas fa-list-alt'></span> Repositories <span className='badge badge-secondary float-right'>{props.repositories.length}</span>
                </h4>
            </div>
            <div className="card-body">
                <div className='row'>
                    {props.repositories.map(item => {
                        return <div key={item} className='card col-3 m-10' onClick={() => props.openRepos(item)}>
                            <div className='card-body'>
                                <button type="button" class="btn btn-default">
                                    <b>{item}</b>
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default Repository;