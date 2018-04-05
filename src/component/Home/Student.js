import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class StudentHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            admin: {},
        }
    }
    // componentWillMount() {
    //     firebase.database().ref('/accounts/Administrator').once('value', (snapshot) => {
    //         console.log(snapshot.val());
    //         this.setState({
    //             admin: snapshot.val(),
    //         })
    //     })
    // }
    render() {
        return (
            <div >
                <h2 className="app">Software Houses</h2>
                <ul className="list-group">
                    {/* <li key={index} id={company.key} className="list-group-item">
                        <div className="card ">
                            <h5 className="card-header">{company.user.name}</h5>
                            <div className="card-body">
                                <h5>Location</h5>
                                <p className="card-text">{company.user.location}</p>
                                <h5>Description</h5>
                                <p className="card-text">{company.user.description}</p>
                                <Link className="btn btn-primary" to={'/details/' + company.user.name + '/' + company.key}>See Profile</Link>
                            </div>
                        </div>
                    </li> */}
                    {
                        this.props.companies.map((company, index) => {
                            return (
                                (company.user.isRemoved !== true) ?
                                    <li key={index} id={company.key} className="list-group-item">
                                        <div className="card ">
                                            <h5 className="card-header">{company.user.name}</h5>
                                            <div className="card-body">
                                                <h5>Location</h5>
                                                <p className="card-text">{company.user.location}</p>
                                                <h5>Description</h5>
                                                <p className="card-text">{company.user.description}</p>
                                                <Link className="btn btn-primary" to={'/details/' + company.user.name + '/' + company.key}>See Profile</Link>
                                            </div>
                                        </div>
                                    </li>
                                    :
                                    null
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        companies: state.companies,
        level: state.level,
    }
}

export default connect(mapStateToProps, null)(StudentHome);