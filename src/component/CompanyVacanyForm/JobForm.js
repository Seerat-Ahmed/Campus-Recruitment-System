import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as firebase from 'firebase';


class VancyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            desp: '',
            salary: '',
            exp: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const element = event.target;

        switch (element.name) {
            case 'title':
                this.setState({ title: element.value, });
                return;
            case 'desp':
                this.setState({ desp: element.value, });
                return;
            case 'exp':
                this.setState({ exp: element.value, });
                return;
            case 'salary':
                this.setState({ salary: element.value, });
                return;
            default:
                return;
        }
    }

    handleSubmit() {
        const job = {
            title: this.state.title,
            description: this.state.desp,
            salary: this.state.salary,
            experience: this.state.exp,
        }
        if(this.props.level !== 'Administrator'){
        firebase.database()
            .ref('/accounts/Company/' + this.props.user.uid + '/' + 'jobs')
            .push(job)
            .then(() => {
                this.setState({
                    title: '',
                    desp: '',
                    salary: '',
                    exp: ''
                })
            });
        }
        else{
            firebase.database()
                .ref('/accounts/Administrator/' + this.props.user.uid + '/' + 'jobs')
                .push(job)
                .then(() => {
                    this.setState({
                        title: '',
                        desp: '',
                        salary: '',
                        exp: ''
                    })
                });
        }

    }

    render() {
        return (
            <div>
                <div className="sign-in section">

                    <div>
                        <h3 className="heading-section">Sign In - Post a Job </h3>
                    </div>

                    <div className="h-line"></div>

                    <div className="row">

                        <div className="col-md-1"></div>

                        <div className="col-md-6">

                            <div className="form-group">
                                <label htmlFor="title" className="my-label-wrapper">
                                    <h4 className="my-label">Job Title: </h4>
                                </label>
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} id="title" placeholder="Job Title" className="form-control" />

                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="my-label-wrapper">
                                    <h4 className="my-label">Description </h4>
                                </label>
                                <textarea type="text" name="desp" value={this.state.desp} onChange={this.handleChange} id="desp" placeholder="Job Description" className="form-control"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exp" className="my-label-wrapper">
                                    <h4 className="my-label">Experience </h4>
                                </label>
                                <input type="text" name="exp" value={this.state.exp} onChange={this.handleChange} id="exp" placeholder="Experience" className="form-control" />

                            </div>
                            <div className="form-group">
                                <label htmlFor="salary" className="my-label-wrapper">
                                    <h4 className="my-label">Salary </h4>
                                </label>
                                <input type="text" name="salary" value={this.state.salary} onChange={this.handleChange} id="salary" placeholder="Salary" className="form-control" />

                            </div>



                            <div className="form-group">
                                <button onClick={this.handleSubmit} className="btn btn-primary">Post Job</button>
                            </div>

                        </div>

                        <div className="col-md-5 aside-logo-wrapper">
                            <div className="avatar">
                                <img src={require('../../assets/firebase-logo.png')} alt="firebase-logo" className="aside-logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

const mapDispatchToProp = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProp)(VancyForm);