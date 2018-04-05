import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <div className="section">
                {
                    (this.props.user) ?
                        <div>
                            <h2>{this.props.user.displayName}</h2>
                            <h2>{this.props.user.email}</h2>
                            <h2>{this.props.user.uid}</h2>
                            <h2>{this.props.user.photoURL}</h2>
                            <h2>{this.props.user.level}</h2>
                        </div>
                        :
                        ''
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(Profile);