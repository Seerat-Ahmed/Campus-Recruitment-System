import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '@firebase/app';
import { connect } from 'react-redux';
import './login-tab.css';
import { clearUserInfo } from '../../store/action/setUserInfo';


class LoginTab extends Component {
    constructor(props) {
        super(props);

        this.loggout = this.loggout.bind(this);
    }

    loggout() {
        firebase.auth().signOut()
            .then(() => this.props.clearUserInfo());
    }

    render() {

        return (

            (this.props.isLoggedIn) ?
                (
                    <ul className="nav navbar-nav navbar-right .login-tab">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Hello {
                                (this.props.user) ?
                                    this.props.user.displayName
                                    :
                                    ''
                            }</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.loggout} to="/signin">Log off</Link>
                        </li>
                    </ul>
                )
                :
                (
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link">Sign In</Link>
                        </li>
                    </ul>
                )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authState,
        user: state.user,
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        clearUserInfo: () => dispatch(clearUserInfo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginTab);