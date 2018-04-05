import React, { Component } from 'react';

class BookingForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hours: '',
            date: '',
            time: '',
            area: this.props.match.params.name,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log(this.state);
        this.props.history.push('/ground/' + this.state.area);
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'hour':
                if (event.target.value + this.state.hours > 0) {
                    this.setState({
                        hours: event.target.value
                    });
                }
                return;
            case 'time':
                this.setState({
                    time: event.target.value
                });
                return;
            case 'date':
                this.setState({
                    date: event.target.value
                });
                return;
            default:
                return;

        }

    }

    render() {
        return (
            <div className="sign-in section">

                <div>
                    <h3 className="heading-section">Booking Form - {this.state.area}</h3>
                </div>

                <div className="h-line"></div>

                <div className="row">

                    <div className="col-md-1"></div>

                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="date">Start Date</label>
                            <input type="date" name="date" id="date" onChange={this.handleChange} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">Start Time</label>
                            <input type="time" name="time" id="time" value={this.state.time} onChange={this.handleChange} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="number">Start Time</label>
                            <input type="number" name="hour" id="number" value={this.state.hour} onChange={this.handleChange} className="form-control" />
                        </div>


                        <div className="form-group">
                            <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                        </div>


                    </div>

                    <div className="col-md-5 aside-logo-wrapper">
                        <div className="avatar">
                            <img src={require('../../assets/firebase-logo.png')} alt="firebase-logo" className="aside-logo" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookingForm;