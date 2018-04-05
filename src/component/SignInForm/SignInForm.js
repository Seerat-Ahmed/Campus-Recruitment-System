import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sign-in.css';
import { firebase } from '@firebase/app';
import { connect } from 'react-redux';
import { setLevel } from '../../store/action/level';

class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isPasswordEmpty: false,
            isInValidEmail: false,
            isEmptyField: false,
            level: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    redirect(event) {
        this.setState({
            level: event.target.textContent,
        });
        this.props.setLevel(event.target.textContent);
    }

    handleChange(event) {
        const element = event.target;

        switch (element.name) {
            case 'email':
                this.setState({ email: element.value, isInValidEmail: false, isEmptyField: false });
                return;
            case 'password':
                this.setState({ password: element.value, isInValidEmail: false, isEmptyField: false });
                return;
            default:
                return;
        }
    }

    handleSubmit() {
        const email = this.state.email;
        const password = this.state.password;
        if (this.validateForm()) {
            this.signUp(email, password);
            this.setState({ email: '', password: '' });
        }

    }

    validateForm() {
        let isValid = true;

        if (this.state.email === '' || this.state.password === '') {
            this.setState({ isEmptyField: true });
            return false;
        }
        else {
            if (this.state.password.length < 6) {
                this.setState({ isPasswordEmpty: true });
                isValid = false;
            }
            if (this.state.email.indexOf('@') > 0 && this.state.email.indexOf('.') > 0) {
                this.setState({ isInValidEmail: false })
            }
            else {
                this.setState({ isInValidEmail: true });
                isValid = false;
            }
            return isValid;
        }
    }
    signUp(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password);
    }

    render() {
        return (

            (this.state.level === '') ?
                <div>
                    <div className="home">
                        <h2 onClick={this.redirect} className="parking-region">Administrator</h2>
                        <h2 onClick={this.redirect} className="parking-region">Company</h2>
                        <h2 onClick={this.redirect} className="parking-region">Student</h2>
                    </div>
                </div>
                :
                <div className="sign-in section">

                    <div>
                        <h3 className="heading-section">Sign In - {this.state.level} </h3>
                    </div>

                    <div className="h-line"></div>

                    <div className="row">

                        <div className="col-md-1"></div>

                        <div className="col-md-6">
                            {
                                (this.state.isEmptyField) ?
                                    <div className="alert alert-danger">All fields are required</div>
                                    :
                                    null
                            }
                            <div className="form-group">
                                <label htmlFor="email" className="my-label-wrapper">
                                    <h4 className="my-label">Email: </h4>
                                </label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Email" className="form-control" />
                                {
                                    (this.state.isInValidEmail) ?
                                        <div className="alert alert-danger">Email isn't valid</div>
                                        :
                                        null
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="my-label-wrapper">
                                    <h4 className="my-label">Password: </h4>
                                </label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="Password" className="form-control" />
                                {
                                    (this.state.isPasswordEmpty) ?
                                        <div className="alert alert-danger">Password must be longer than 6 digits.</div>
                                        :
                                        null
                                }
                            </div>

                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" name="remember-me" />
                                    <span className="my-label"> Remember me?</span>
                                </label>
                            </div>

                            <div className="form-group">
                                <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                            </div>

                            <Link to="/signup" className="link">Sign up as a new user?</Link>

                        </div>

                        <div className="col-md-5 aside-logo-wrapper">
                            <div className="avatar">
                                <img src={require('../../assets/firebase-logo.png')} alt="firebase-logo" className="aside-logo" />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLevel: (level) => dispatch(setLevel(level)),
    }
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);