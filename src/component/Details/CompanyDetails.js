import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class CompanyDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            uid: this.props.match.params.id,
            email: '',
            details: {},
        }
    }

    componentWillMount() {
        console.log(this.state.name, this.state.uid);
        let that = this;
        let jobs = [];
        firebase.database().ref('/accounts/Student/' + this.state.uid).once('value', (snapshot) => {

            this.setState({
                details: snapshot.val(),
            })
        })
    }


    render() {
        return (
            <div>
                {
                    (this.state.details) ?
                        <div>
                            <div className="list-group">

                                <div className="card ">
                                    <h5 className="card-header">{this.state.name} - {this.state.details.position}</h5>
                                    <div className="card-body">
                                        <h5>Position</h5>
                                        <p className="card-text">{this.state.details.position}</p>
                                        <h5>Experience</h5>
                                        <p className="card-text">{this.state.details.experience}</p>
                                        <h5>Description</h5>
                                        <p className="card-text">{this.state.details.description}</p>
                                        <h5>Email</h5>
                                        <p className="card-text">{this.state.details.email}</p>
                                        <h5>Contact</h5>
                                        <p className="card-text">{this.state.details.contact}</p>
                                        <h5>Resume</h5>
                                        <p className="card-text"><a href={this.state.details.cvUrl}>See Resume: {this.state.details.cvUrl}</a></p>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProp = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProp)(CompanyDetails);