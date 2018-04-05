import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class PCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            key: this.props.match.params.key,
        }

    }

    componentWillMount() {
        console.log('/accounts/Company/' + this.props.user.uid + '/jobs/' + this.state.key + '/proposal')
        firebase.database()
            .ref('/accounts/Company/' + this.props.user.uid + '/jobs/' + this.state.key + '/proposal').once('child_added', (snapshot) => {
                let obj = {
                    proposal: snapshot.val(),
                    key: snapshot.key,
                }

                this.setState({
                    proposals: [...this.state.proposals, obj],
                })
            });
    }

    render() {
        console.log(this.state.proposals)
        return (
            <div>
                <h2>Proposal</h2>
                {
                    this.state.proposals.map((p, index) => {
                        return <div key={index} className="card ">
                            <h5 className="card-header">{p.proposal.name}</h5>
                            <div className="card-body">
                                <h5>Description</h5>
                                <p className="card-text">{p.proposal.whyme}</p>
                                <Link className="btn btn-primary" to={'/details/' + p.proposal.name + '/' + p.proposal.uid}>See Profile</Link>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(PCard);