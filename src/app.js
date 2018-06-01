import React, { PropTypes } from 'react';
import Header from './components/header/index';
import Footer from './components/footer/index';


class App extends React.Component {
    constructor(props) {
        super(props);
    } 

    static path = '/';
    static PropTypes = {
        children: PropTypes.any.isRequired
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='panel panel-primary'>
                        <div className='panel-header'><Header /></div>
                        <div className='panel-body'>
                            { this.props.children }
                        </div>
                        <div className='panel-footer'><Footer /></div>
                        </div>
                    </div>
                </div>
            
        );
    }
}
export default App;
