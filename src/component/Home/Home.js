import React, { Component } from 'react';
import BookingForm from '../BookingForm/BookingForm';
import './home.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';


class Home extends Component {
    constructor(props) {
        super(props);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent(event) {
        let uid = event.target.id;
        firebase.database().ref('/accounts/Student/' + uid + '/isRemoved').set(true);
    }

    deleteCompany(event) {
        let uid = event.target.id;
        firebase.database().ref('/accounts/Company/' + uid + '/isRemoved').set(true);
    }

    render() {
        return (
            (this.props.level === 'Administrator') ?
                <div className="homee">
                    <div className="row">

                        <div className="col-md-6">
                            <h2>Companies</h2>
                            <ul className="list-group">
                                {
                                    this.props.companies.map((company, index) => {
                                        return (
                                            (company.user.isRemoved !== true) ?
                                                <div key={index} className={(company.user.isRemoved) ? "card red" : "card"}>
                                                    <h5 className="card-header">{company.user.name}</h5>
                                                    <div className="card-body">
                                                        <h5>Location</h5>
                                                        <p className="card-text">{company.user.location}</p>
                                                        <h5>Description</h5>
                                                        <p className="card-text">{company.user.description}</p>
                                                        <Link className="btn btn-primary" to={'/details/' + company.user.name + '/' + company.key}>See Details</Link>
                                                        <button onClick={this.deleteCompany} id={company.key} className="btn btn-danger">Delete</button>
                                                    </div>
                                                </div>
                                                :
                                                null
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div className="col-md-6">
                            <h2>Students</h2>

                            <ul className="list-group">
                                {
                                    this.props.students.map((company, index) => {
                                        return (
                                            (company.user.isRemoved !== true) ?
                                                <div key={index} className={(company.user.isRemoved) ? "card red" : "card"}>
                                                    <h5 className="card-header">{company.user.name}</h5>
                                                    <div className="card-body">
                                                        <h5>Description</h5>
                                                        <p className="card-text">{company.user.description}</p>
                                                        <Link className="btn btn-primary" to={'/detailsa/' + company.user.name + '/' + company.key}>See Profile</Link>
                                                        <button onClick={this.deleteStudent} id={company.key} className="btn btn-danger">Delete</button>

                                                    </div>
                                                </div>
                                                :
                                                null
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                :
                null
        );
    }
}

const mapStateToProps = (state) => {
    return {
        companies: state.companies,
        students: state.students,
        level: state.level,
    }
}

export default connect(mapStateToProps, null)(Home);