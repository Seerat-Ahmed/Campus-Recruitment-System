import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as firebase from 'firebase';


class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            desp: '',
            skills: '',
            experience: '',
            cvUrl: '',
            qualification: '',
            email: this.props.user.email,
            uid: this.props.user.uid,
            name: this.props.user.displayName,
            position: '',
            contact: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(obj) {
        firebase.database().ref('/accounts/Student/' + this.props.user.uid).update(obj);
    }

    handleChange(event) {
        const element = event.target;

        switch (element.name) {
            case 'experience':
                this.setState({ experience: element.value, });
                return;
            case 'desp':
                this.setState({ desp: element.value, });
                return;
            case 'skills':
                this.setState({ skills: element.value, });
                return;
            case 'cv':
                this.setState({ cvUrl: element.value, });
                return;
            case 'position':
                this.setState({ position: element.value, });
                return;
            case 'email':
                this.setState({ email: element.value, });
                return;
            case 'contact':
                this.setState({ contact: element.value, });
                return;
            default:
                return;
        }
    }

    handleSubmit() {
        let obj = {
            email: this.state.email,
            name: this.state.name,
            position: this.state.position,
            cvUrl: this.state.cvUrl,
            contact: this.state.contact,
            uid: this.state.uid,
            experience: this.state.experience,
            description: this.state.desp,

        }
        this.updateUser(obj);

        this.setState({
            desp: '',
            skills: '',
            experience: '',
            cvUrl: '',
            qualification: '',
            email: '',
            uid: '',
            name: '',
            position: ''    ,
            contact: '',
        });
    }

    render() {
        return (
            <div>
                <div className="sign-in section">

                    <div>
                        <h3 className="heading-section">Sign In - Update Profile </h3>
                    </div>

                    <div className="h-line"></div>

                    <div className="row">

                        <div className="col-md-1"></div>

                        <div className="col-md-6">

                            <div className="form-group">
                                <label htmlFor="experience" className="my-label-wrapper">
                                    <h4 className="my-label">Experience: </h4>
                                </label>
                                <input type="text" name="experience" value={this.state.experience} onChange={this.handleChange} id="experience" placeholder="Experience" className="form-control" />

                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="my-label-wrapper">
                                    <h4 className="my-label">Description </h4>
                                </label>
                                <textarea type="text" name="desp" value={this.state.desp} onChange={this.handleChange} id="desp" placeholder="Job Description" className="form-control"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="skills" className="my-label-wrapper">
                                    <h4 className="my-label">Skills </h4>
                                </label>
                                <input type="text" name="skills" value={this.state.skills} onChange={this.handleChange} id="skills" placeholder="Experience" className="form-control" />

                            </div>
                            <div className="form-group">
                                <label htmlFor="cv" className="my-label-wrapper">
                                    <h4 className="my-label">Resume URL </h4>
                                </label>
                                <input type="text" name="cv" value={this.state.cvUrl} onChange={this.handleChange} id="cv" placeholder="Resume URL" className="form-control" />

                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="my-label-wrapper">
                                    <h4 className="my-label">Email </h4>
                                </label>
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} id="cv" placeholder="Email" className="form-control" />

                            </div>

                            <div className="form-group">
                                <label htmlFor="contact" className="my-label-wrapper">
                                    <h4 className="my-label">Contact</h4>
                                </label>
                                <input type="text" name="contact" value={this.state.contact} onChange={this.handleChange} id="email" placeholder="Contact" className="form-control" />

                            </div>

                            <div className="form-group">
                                <label htmlFor="position" className="my-label-wrapper">
                                    <h4 className="my-label">Position </h4>
                                </label>
                                <input type="text" name="position" value={this.state.position} onChange={this.handleChange} id="position" placeholder="Position" className="form-control" />

                            </div>


                            <div className="form-group">
                                <button onClick={this.handleSubmit} className="btn btn-primary">Update</button>
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


export default connect(mapStateToProps, mapDispatchToProp)(StudentProfile);