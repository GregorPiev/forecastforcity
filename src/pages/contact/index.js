import React from 'react';
import './style.less';
//import send from 'gmail-send';
import nodemailer from 'nodemailer';

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
        //console.log("Mount page Contact");
        $.ajax({
            url: '/data/contact.json',
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
    sendEmail(e) {
        e.preventDefault();
        const fullname = this.refs.fname.value;
        const email = this.refs.email.value;
        const phone = this.refs.phone.value;
        const subject = this.refs.subject.value;
        const description = this.refs.description.value;
        console.log(fullname + '   ' + email + '   ' + phone + '   ' + subject + '   ' + description);
        /*send({
            user:'gregpiev@gmail.com',
            pass:'piev180457',
            to: 'gregpiev@gmail.com',
            from: fullname + '<' + email + '>',
            subject: subject,
            text: description
        },
            function(err, res) {
                console.log('Err:', err, '; res:', res);
            });*/

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gregpiev@gmail.com',
                pass: 'piev180457'
            }
        });

        const mailOptions = {
            from: fullname + '<' + email + '>',
            to: 'gregpiev@gmail.com',
            subject: subject,
            text: 'Hello! My name is' + fullname + '. My phone:' + phone + '. ' + description
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                $("#success").html('').hide();
                $("#danger").html(error).show('slow');
            } else {
                console.log('Email sent: ' + info.response);
                $("#success").html(info.response).show('slow');
                $("#danger").html('').hide();
            }
        });
    }

    render() {
        const {title, description} = this.state;
        return (
                <div id='contact_page'>
                    <article>
                        <header><h2>{title}</h2></header>

                        <section>
                            <p>{description}</p>
                        </section>
                        <section>
                           <form action='/' className='form-horizontal' onSubmit={this.sendEmail.bind(this)} autoComplete>
                              <div className='form-group'>
                                  <label className='col-md-3 col-xs-12'>Full Name</label>
                                  <div className='col-md-9 col-xs-12'>
                                      <input className='form-control' ref='fname' placeholder='Full Name' type='text' required />
                                  </div>
                              </div>
                               <div className='form-group'>
                                   <label className='col-md-3 col-xs-12'>Phone</label>
                                   <div className='col-md-9 col-xs-12'>
                                       <input className='form-control' placeholder='Phone' type='number' ref='phone'  />
                                   </div>
                               </div>
                               <div className='form-group'>
                                   <label className='col-md-3 col-xs-12'>Email</label>
                                   <div className='col-md-9 col-xs-12'>
                                       <input className='form-control' placeholder='Email' type='email' ref='email' required  />
                                   </div>
                               </div>
                               <div className='form-group'>
                                   <label className='col-md-3 col-xs-12'>Subject</label>
                                   <div className='col-md-9 col-xs-12'>
                                       <input className='form-control' placeholder='Subject' type='text' ref='subject' required  />
                                   </div>
                               </div>
                               <div className='form-group'>
                                   <label className='col-md-3 col-xs-12'>Description</label>
                                   <div className='col-md-9 col-xs-12'>
                                       <textarea cols='10'  className='form-control col-md-12 col-xs-12' ref='description' placeholder='Enter description'></textarea>
                                   </div>
                               </div>
                               <div className='form-group'>
                                   <div className='col-md-offset-2 col-md-10 col-xs-12 text-right'>
                                       <button type='submit' className='btn btn-primary'>Send</button>
                                       <div id='success' className='alert alert-success text-left col-md-6'><strong>Success!</strong> Indicates a successful or positive action.</div>
                                       <div id='danger' className='alert alert-danger text-left col-md-6'><strong>Danger!</strong> Indicates a dangerous or potentially negative action.</div>
                                   </div>
                               </div>
                           </form>
                        </section>
                    </article>
                </div>
                );
    }

}

export default Contact;
