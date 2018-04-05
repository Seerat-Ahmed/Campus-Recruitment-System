import React, { Component } from 'react';
import './parking-space.css';

class ParkingSpace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEmpty: true,
            remainingTime: 10,
        }
    }


    filled() {
        if (this.state.isEmpty) {
            let interval = setInterval(() => {
                if (this.state.remainingTime === 0) {
                    if (this.parking) {
                        this.setState({ isEmpty: true, remainingTime: 10 });
                        clearInterval(interval);
                    }
                }
                if (this.parking)
                    this.setState({
                        remainingTime: this.state.remainingTime - 1,
                    })

            }, 1000);

            this.setState({
                isEmpty: !this.state.isEmpty,
            });
        }
    }

    render() {
        return (
            <div ref={(el) => this.parking = el}>
                <div className="parking-space">
                    <div>
                        <h4 onClick={this.filled.bind(this)} className="parking-no">{this.props.number}</h4>
                        {
                            (this.state.remainingTime > 0 && !this.state.isEmpty) ?
                                <h4 className="timer">{this.state.remainingTime}</h4>
                                :
                                null
                        }
                    </div>
                    {
                        (this.state.isEmpty) ?
                            null
                            :
                            <img
                                src={require('../../assets/car.png')}
                                alt="a car"
                                className="car" />
                    }
                </div>
            </div>
        )
    }
}

export default ParkingSpace;