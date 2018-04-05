import React, { Component } from 'react';
import './ground.css';
import ParkingSpace from './ParkingSpace';

class Ground extends Component {
    // constructor(props) {
    //     super(props);
    masstraining123
    // }
    render() {
        return (
            <div className="ground">
                <h2 className="area">{this.props.match.params.name}</h2>
                <ParkingSpace number={1} />
                <ParkingSpace number={2} />
                <ParkingSpace number={3} />
                <ParkingSpace number={4} />
                <ParkingSpace number={5} />
                <ParkingSpace number={6} />
                <ParkingSpace number={7} />
                <ParkingSpace number={8} />
                <ParkingSpace number={9} />
                <ParkingSpace number={10} />
                <ParkingSpace number={11} />
            </div>
        )
    }
}

export default Ground;