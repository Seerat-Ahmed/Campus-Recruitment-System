import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

class PrivateRoute extends Component {
    
    render() {
        return (
            (this.props.isLoggedIn) ?
                <Route exact path={this.props.path} component={this.props.component} />
                :
                <Route exact path={this.props.path} component={this.props.altComponent} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authState,
    }
}

export default connect(mapStateToProps, null)(PrivateRoute)