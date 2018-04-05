import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear() }
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-line">
                    <p>
                        &copy; {this.state.year} - Seerat Ahmed Khan
                    </p>
                </div>

            </div>
        );
    }
}

export default Footer;
