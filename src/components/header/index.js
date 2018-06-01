import React from 'react';
import { Link } from 'react-router';
import './style.less';

const Header = () => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li className="active"><Link to="/">Home <span className="sr-only">(current)</span></Link></li>
                    <li><Link to="/forecast">Forecast</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
        </div>
    </nav>
);
export default Header;
