import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { Switch } from 'react-router';
import App from '../App/App';
import NotFound from '../NotFound404/NotFound404';
import NavBar from '../NavBar/NavBar';
import connect from 'react-redux/lib/connect/connect';
import { setToLoggedIn, setToLoggedOut } from '../../store/action/authState';
import { setUserInfo, clearUserInfo } from '../../store/action/setUserInfo';
import { stopLoading, startLoading } from '../../store/action/loader';
import * as firebase from 'firebase';
import SignInForm from '../SignInForm/SignInForm';
import About from '../About/About';
import Contact from '../Contact/Contact';
import SignUpForm from '../SignUpForm/SignUpForm';
import Profile from '../Profile/Profile';
import history from '../../history';
import PrivateRoute from './PrivateRoute';
import FireLoader from '../Loader/FireLoader';
import Ground from '../Ground/Ground';
import Home from '../Home/Home';
import BookingForm from '../BookingForm/BookingForm';
import { setLevel } from '../../store/action/level';
import { getCompany } from '../../store/action/getCompany';
import { getStudent } from '../../store/action/getStudent';
import CompanyHome from '../Home/Company';
import StudentHome from '../Home/Student';
import CompanyDetails from '../Details/CompanyDetails';
import StudentDetails from '../Details/StudentDetails';
import VancyForm from '../CompanyVacanyForm/JobForm';
import StudentProfile from '../Profile/StudentProfile';
import CompanyOwnProfile from '../Profile/CompanyOwnProfile';
import StudentOwnPorfile from '../Profile/StudentOwnPorfile';
import ProposalForm from '../Proposal/ProposalForm';
import PCard from '../Proposal/Card';

class MyRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: '',
        }
        this.checkForAuthState = this.checkForAuthState.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.getCompanies = this.getCompanies.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.checkFraud = this.checkFraud.bind(this);
    }

    checkFraud(user) {
        if (user.photoURL !== this.props.level) {
            firebase.auth().signOut();
            history.push('/signin');
        }
    }

    deleteUser(user) {

        firebase.database()
            .ref('/accounts/' + this.props.level + '/' + user.uid + '/isRemoved')
            .once('value', (snapshot) => {
                if (snapshot.val()) {
                    firebase.database().ref('/accounts/' + this.props.level + '/' + user.uid).remove();

                    user.delete().then(function () {
                        console.log('deleted')
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            })
    }

    getCompanies() {
        firebase.database()
            .ref('/accounts/Company')
            .on('child_added', (snapshot) => {
                this.props.getCompany(snapshot.val(), snapshot.key)
            });
    }


    getStudents() {
        firebase.database()
            .ref('/accounts/Student')
            .on('child_added', (snapshot) => {
                this.props.getStudent(snapshot.val(), snapshot.key)
            });
    }


    checkForAuthState() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    level: user.photoURL
                });
                this.props.setUserInfo(user);
                this.props.setToLoggedIn();
                this.props.setLevel(user.photoURL);
                this.getCompanies();
                this.getStudents();
                this.checkFraud(user);
                if (this.props.user)
                    this.deleteUser(user);
                history.push('/');
            }
            else {
                this.props.clearUserInfo();
                this.props.setToLoggedOut();
                history.push('/signin');
            }
            this.props.stopLoading();
        })
    }

    componentWillMount() {
        this.checkForAuthState();
    }




    render() {
        return (
            <Router>
                {
                    (this.props.isLoading) ?
                        <FireLoader />
                        :
                        <div>
                            <NavBar />
                            <Switch>
                                <Route exact path="/contact" component={Contact} />
                                <Route exact path="/about" component={About} />
                                {
                                    (this.props.level === 'Administrator') ?
                                        <PrivateRoute path={'/home'} component={Home} altComponent={SignInForm} />
                                        : null
                                }
                                {
                                    (this.props.level === 'Company') ?
                                        <PrivateRoute path={'/home'} component={CompanyHome} altComponent={SignInForm} />
                                        : null
                                }
                                {
                                    (this.props.level === 'Company') ?
                                        <PrivateRoute path={'/details/:name/:id'} component={CompanyDetails} altComponent={SignInForm} />
                                        : null
                                }
                                {
                                    (this.props.level === 'Company' || this.props.level === 'Administrator') ?
                                        <PrivateRoute path={'/create'} component={VancyForm} altComponent={SignInForm} />
                                        : null
                                }
                                {
                                    (this.props.level === 'Student') ?
                                        <PrivateRoute path={'/home'} component={StudentHome} altComponent={SignInForm} />
                                        : null
                                }

                                {
                                    (this.props.level === 'Student') ?
                                        <PrivateRoute path={'/details/:name/:id'} component={StudentDetails} altComponent={SignInForm} />
                                        : null
                                }
                                {
                                    (this.props.level === 'Administrator') ?
                                        <PrivateRoute path={'/details/:name/:id'} component={StudentDetails} altComponent={SignInForm} />
                                        : null
                                }
                                {
                                    (this.props.level === 'Administrator') ?
                                        <PrivateRoute path={'/detailsa/:name/:id'} component={CompanyDetails} altComponent={SignInForm} />
                                        : null
                                }
                                {
                                    (this.props.level === 'Student') ?
                                        <PrivateRoute path={'/update/'} component={StudentProfile} altComponent={SignInForm} />
                                        : null
                                }
                                <PrivateRoute path={'/signin'} component={App} altComponent={SignInForm} />
                                <PrivateRoute path={'/signup'} component={App} altComponent={SignUpForm} />
                                {
                                    (this.props.level === 'Company') ?
                                        <PrivateRoute path={'/profile'} component={CompanyOwnProfile} altComponent={SignInForm} /> : null
                                }
                                {
                                    (this.props.level === 'Student') ?
                                        <PrivateRoute path={'/profile'} component={StudentOwnPorfile} altComponent={SignInForm} /> : null
                                }
                                <PrivateRoute path={'/proposal/:uid/:key'} component={ProposalForm} altComponent={SignInForm} />                                
                                <PrivateRoute path={'/seeproposal/:key'} component={PCard} altComponent={SignInForm} />                                
                                
                                <PrivateRoute path={'/'} component={App} altComponent={SignInForm} />
                                <Route exact component={NotFound} />
                            </Switch>
                        </div>
                }
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        isLoading: state.isLoading,
        level: state.level,
        user: state.user,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setToLoggedIn: () => dispatch(setToLoggedIn()),
        setToLoggedOut: () => dispatch(setToLoggedOut()),
        setUserInfo: (user) => dispatch(setUserInfo(user)),
        clearUserInfo: () => dispatch(clearUserInfo()),
        stopLoading: () => dispatch(stopLoading()),
        setLevel: (level) => dispatch(setLevel(level)),
        getCompany: (user, key) => dispatch(getCompany(user, key)),
        getStudent: (user, key) => dispatch(getStudent(user, key))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyRouter);
