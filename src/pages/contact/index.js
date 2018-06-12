import React from 'react';
import './style.less';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 'contact', title: 'Contact', description: 'Loading....'};
    }
    static path = "/contact";
    componentDidMount() {
        this.getPageData();
    }

    getPageData() {
        console.log("Mount page Contact");
        $.ajax({
            url: '/data/contact.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log("Data:" + JSON.stringify(data));
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

export default Contact;
