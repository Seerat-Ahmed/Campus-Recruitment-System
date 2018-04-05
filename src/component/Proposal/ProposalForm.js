import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as firebase from 'firebase';


class Proposal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            desp: '',
            uid: this.props.match.params.uid,
            key: this.props.match.params.key,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const element = event.target;

        switch (element.name) {
            case 'desp':
                this.setState({ desp: element.value, });
                return;
            default:
                return;
        }
    }

    handleSubmit() {
        const job = {
            whyme: this.state.desp,
            name: this.props.user.displayName,
            uid: this.props.user.uid,
        }
        firebase.database()
            .ref('/accounts/Company/' + this.state.uid + '/jobs/' + this.state.key + '/proposal/')
            .push(job)
            .then(() => {
                this.setState({
                    desp: '',
                })
            });

    }

    render() {
        return (
            <div>
                <div className="sign-in section">

                    <div>
                        <h3 className="heading-section">Describe why you're fit for this job? </h3>
                    </div>

                    <div className="h-line"></div>

                    <div className="row">

                        <div className="col-md-1"></div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password" className="my-label-wrapper">
                                    <h4 className="my-label">Why me? </h4>
                                </label>
                                <textarea type="text" name="desp" value={this.state.desp} onChange={this.handleChange} id="desp" placeholder="Job Description" className="form-control"></textarea>
                            </div>




                            <div className="form-group">
                                <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
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


export default connect(mapStateToProps, mapDispatchToProp)(Proposal);