import React from 'react';
//import pageContent from '../../services/pages';
import './style.less';
const newURL = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 'home', title: '', description: 'Loading....'};
    }
    static path = '/';
    componentDidMount() {
        this.getPageData();
    }

    getPageData() {
        console.info(newURL);
        $.ajax({
            url: newURL + 'data/home.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                //console.log("Data:" + JSON.stringify(data));
                this.setState({
                    title: data.title,
                    description: data.description
                });
            }.bind(this),
            error: function (xhr, status, err) {
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

export default Home;
