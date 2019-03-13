import React from 'react';

let Language = props => (
    <div className='col-12'>
        <div className="card">
            <div className="card-header">
                <h4>
                    <span className='fas fa-list-alt'></span> Languages <span className='badge badge-secondary float-right'>{props.count}</span>
                </h4>
            </div>
            <div className="card-body">
                <div className='row'>
                    {props.languages.map(item => {
                        item = item.split('_');
                        return <div key={item[0]} className='card col-3 m-10' onClick={() => props.gotoRepos(item[0])}>
                            <div className='card-body'>
                                <button type="button" class="btn btn-default">
                                    <b>{item[0]}</b>&nbsp;&nbsp;<span className="badge badge-primary">{item[1]}</span>
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default Language;