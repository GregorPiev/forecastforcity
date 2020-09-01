import React from 'react';
import './style.less';
const newURL = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname;

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 'about', title: 'About', description: 'Loading....'};
    }
    static path = '/about';
    componentDidMount() {
        this.getPageData();
    }

    getPageData() {
        $.ajax({
            url: newURL + 'data/about.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                //console.log("Data:" + JSON.stringify(data));
                this.setState({
                    title: data.title,
                    description: data.description
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        const {title, description} = this.state;
        return (
                <div>
                    <article>
                        <header><h2>{title}</h2></header>

                        <section>
                            <p>{description}</p>
                        </section>
                    </article>
                </div>
        );
    }
}

export default About;
