import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import './sign-up.css';
import connect from 'react-redux/lib/connect/connect';
import { setToLoggedIn } from '../../store/action/authState';
import { setUserInfo } from '../../store/action/setUserInfo';
import { setLevel } from '../../store/action/level';

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            buttonState: 'disabled',
            isValidPassword: false,
            isValidEmail: false,
            isEmptyField: false,
            isPasswordNotMatch: false,
            level: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
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
            case 'username':
                this.setState({ username: element.value, isEmptyField: false })
                break;
            case 'email':
                this.setState({ email: element.value, isValidEmail: false });
                break;
            case 'password':
                this.setState({ password: element.value, isValidPassword: false });
                break;
            case 'confirm-password':
                this.setState({ confirmPassword: element.value, isPasswordNotMatch: false })
                break;
            default:
                break;
        }

    }

    validateCredentials() {
        let isValid = true

        if (this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
            this.setState({ isEmptyField: true });
            return false;
        }
        else {
            if (this.state.email.indexOf('@') < 0 || this.state.email.indexOf('.') < 0) {
                this.setState({ isValidEmail: true });
                isValid = false;
            }
            if (this.state.password.length < 6) {
                this.setState({ isValidPassword: true })
                isValid = false;
            }

            if (this.state.password !== this.state.confirmPassword) {
                this.setState({ isPasswordNotMatch: true });
                isValid = false;
            }
            return isValid;
        }
    }

    saveUserToDatabase(user) {
        firebase.database().ref('/accounts/' + this.state.level + '/' + user.uid).set({
            name: user.displayName,
            uid: user.uid,
            email: user.email,
        })
            .then(() => {
                console.log('Successfully saved to database');
            })
            .catch((error) => {
                console.log('erorr', error)
            });
    }

    handleSubmit() {

        const email = this.state.email;
        const password = this.state.password;
        const name = this.state.username;
        const that = this;
        if (this.validateCredentials()) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    return user.updateProfile({
                        displayName: name,
                        photoURL: that.state.level,
                    })
                        .then(() => {
                            that.props.setUserInfo(user);
                            that.saveUserToDatabase(this.props.user);                            
                            that.props.setLoginState();
                            this.setState({ username: '', email: '', password: '', confirmPassword: '' });
                            that.props.history.push('/');
                        })
                        .catch((error) => console.log('Failed to update user: ', error));
                })
                .catch((error) => console.log('Failed to Logged In', error));

           
        }
        else {
            console.log('false');
        }
    }

    render() {
        return (
            (this.state.level === '') ?
                <div>
                    <div className="home">
                        <h2 onClick={this.redirect} className="parking-region">Company</h2>
                        <h2 onClick={this.redirect} className="parking-region">Student</h2>
                    </div>
                </div>
                :
                <div className="sign-in section">

                    <div>
                        <h3 className="heading-section">Sign Up - {this.state.level}</h3>
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
                                <label htmlFor="username" className="my-label-wrapper">
                                    <h4 className="my-label">Username: </h4>
                                </label>
                                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} id="username" placeholder="Username" className="form-control" required />
                                {
                                    (this.state.isNameMissing) ?
                                        <div className="alert alert-danger">Kindly fill the name</div>
                                        :
                                        null
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="my-label-wrapper">
                                    <h4 className="my-label">Email: </h4>
                                </label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Email" className="form-control" required />
                                {
                                    (this.state.isValidEmail) ?
                                        <div className="alert alert-danger">Invalid Email</div>
                                        :
                                        null
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="my-label-wrapper">
                                    <h4 className="my-label">Password: </h4>
                                </label>
                                <input type="password" name="password" onChange={this.handleChange} value={this.state.password} id="password" placeholder="Password" className="form-control" required />
                                {
                                    (this.state.isValidPassword) ?
                                        <div className="alert alert-danger">Password must be greater than 6 digits</div>
                                        :
                                        null
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm-password" className="my-label-wrapper">
                                    <h4 className="my-label">Confirm Password: </h4>
                                </label>
                                <input type="password" name="confirm-password" onChange={this.handleChange} value={this.state.confirmPassword} id="confirm-password" placeholder="Confirm Password" className="form-control" required />
                                {
                                    (this.state.isPasswordNotMatch) ?
                                        <div className="alert alert-danger">Password doesn't match</div>
                                        :
                                        null
                                }
                            </div>

                            <div className="form-group">
                                <button onClick={this.handleSubmit} className={"btn btn-primary "}>Submit</button>
                            </div>

                            <Link to="/signin" className="link">Already have an account?</Link>

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


const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUserInfo: (user) => dispatch(setUserInfo(user)),
        setToLoggedIn: () => setToLoggedIn(),
        setLevel: (level) =>  dispatch(setLevel(level)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);