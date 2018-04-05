import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CompanyHome extends Component {
    render() {
        return (
            <div className="company-home">
                <h2 className="app">Students</h2>
                <ul className="list-group">

                    {
                        this.props.students.map((company, index) => {
                            return (
                                (company.user.isRemoved !== true) ?
                                    <div key={index} className="card ">
                                        <h5 className="card-header">{company.user.name} - {company.user.position}</h5>
                                        <div className="card-body">
                                            <h5>Description</h5>
                                            <p className="card-text">{company.user.description}</p>
                                            <Link className="btn btn-primary" to={'/details/' + company.user.name + '/' + company.key}>See Profile</Link>
                                        </div>
                                    </div>
                                    : null
                            )
                        })
                    }
                </ul>
            </div>)
    }
}


const mapStateToProps = (state) => {
    return {
        students: state.students,
        level: state.level,
    }
}

export default connect(mapStateToProps, null)(CompanyHome);