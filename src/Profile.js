import React, { Component } from 'react';
import axios from 'axios';

import Repository from './Repository';
import Language from './Language';

export default class Profile extends Component {

    state = {
        repoArray: [],
        languages: [],
        languageCount: 0
    };

    componentDidMount() {
        this.props.setLoader(true);

        let created_at = new Date(this.props.user.created_at);
        created_at = created_at.toLocaleDateString() + " " + created_at.toLocaleTimeString();
        this.props.user.created_at = created_at;

        let updated_at = new Date(this.props.user.updated_at);
        updated_at = updated_at.toLocaleDateString() + " " + updated_at.toLocaleTimeString();
        this.props.user.updated_at = updated_at;

        axios.get(this.props.user.repos_url)
            .then(result => this.getStats(result.data))
            .catch(err => console.log);
    }

    getStats(repos) {
        let repoArray = [], languages = [],
        languageMap = new Map(), languageCount = 0;

        repos.forEach(repo => {
            repoArray.push(repo.name);
            if(repo.language) {
                languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
                languageCount++;
            }
        });

        for(let [key, value] of languageMap) {
            languages.push(key + '_' + (value * 100 / languageCount).toFixed(2) + "%");
        }

        this.setState({
            languageCount,
            languages,
            repoArray
        })
        this.props.setLoader(false);
    }

    render() {
        return (
            <div className='row'>
                <div className='col-12'>
                    <div className='col-12 text-center'>
                        <h3>{this.props.user.name}</h3>
                        <h4><span className='fas fa-map-marker-alt'></span> {this.props.user.location}</h4>
                        <h5>{this.props.user.company}</h5>
                        <h6><i>{this.props.user.bio}</i></h6>
                    </div>
                    {   this.props.user.email && this.props.user.blog && 
                        <div className='col-12'>
                            <p>
                                <span className='float-left'>
                                    Email : <b>{ this.props.user.email }</b>
                                </span>
                                <span className='float-right'>
                                    Blog : <b>{ this.props.user.blog }</b>
                                </span>
                            </p><br />
                            <hr />
                        </div>
                    }
                    <div className='col-12'>
                        <p>
                            <span className='float-left'>
                                Profile Created On : <b>{ this.props.user.created_at }</b>
                            </span>
                            <span className='float-right'>
                                Last Updated On : <b>{ this.props.user.updated_at }</b>
                            </span>
                        </p><br />
                        <hr />
                    </div>
                </div>
                { this.state.languageCount &&
                <div className='col-12'>
                    <Language 
                        gotoRepos={language => window.open("https://github.com/search?q=user:" + this.props.user.login + "&l=" + language, "_blank")} 
                        languages={this.state.languages}
                        count={this.state.languageCount}
                     />
                     <hr />
                </div>
                }
                { this.state.repoArray.length &&
                <div className='col-12'>
                    <Repository 
                        openRepos={repository => window.open("https://github.com/" + this.props.user.login + "/" + repository, "_blank")} 
                        repositories={this.state.repoArray}
                     />
                     <hr />
                </div>
                }
            </div>
        );
    }

}