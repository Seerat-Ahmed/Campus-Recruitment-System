import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';


class CompanyOwnProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            uid: this.props.match.params.id,
            email: '',
            details: {},
            jobs: [],
        }

        this.deleteJob = this.deleteJob.bind(this);
    }

    deleteJob(event) {
        console.log(event.target);
        firebase.database().ref('/accounts/Company/' + this.props.user.uid + '/jobs/' + event.target.id).remove();
    }

    componentWillMount() {
        let that = this;
        let jobs = [];
        firebase.database().ref('/accounts/Company/' + this.props.user.uid).once('value', (snapshot) => {
            this.setState({
                details: snapshot.val(),
            })
        })
            .then(() => {
                console.log('sucesss');
                if (that.state.details) {
                    for (var job in that.state.details.jobs) {
                        this.setState({
                            jobs: [...that.state.jobs, {
                                job: that.state.details.jobs[job],
                                key: job,
                            }],
                        });
                    }
                }
            })


    }

    render() {
        console.log(this.state.details.jobs);
        return (
            <div>
                {
                    (this.state.details) ?
                        <div>
                            <div className="list-group">

                                <div className="card ">
                                    <h5 className="card-header">{this.props.user.displayName}</h5>
                                    <div className="card-body">
                                        <h5>Location</h5>
                                        <p className="card-text">{this.state.email}</p>
                                    </div>
                                </div>
                                <ul className="list-group">

                                    {
                                        this.state.jobs.map((job, index) => {
                                            return (
                                                <li key={index} className="list-group-item">
                                                    <div className="card">
                                                        <h5 className="card-header">{job.job.title}</h5>
                                                        <div className="card-body">
                                                            <h5>Description</h5>
                                                            <p className="card-text">{job.job.description}</p>
                                                            <h5>Experience</h5>
                                                            <p className="card-text">{job.job.experience}</p>
                                                            <h5>Salary</h5>
                                                            <p className="card-text">{job.job.salary} PKR</p>
                                                            <Link to={'/seeproposal/' + job.key} id={job.key} className="btn btn-primary">See Proposal</Link>
                                                            <button id={job.key} onClick={this.deleteJob} className="btn btn-danger">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProp = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProp)(CompanyOwnProfile);