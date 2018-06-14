'use strict';
import React from 'react';
import './style.less';
import 'babel-polyfill';
import Weather from '../../components/weather/index';
const API_KEY = 'bbdb11a7359e8238b084e4cf0ce219f0';

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'forecast',
            title: 'Forecast',
            description: 'Loading....',
            countries: [],
            choosedCountry: '',
            cities: '',
            choosedCity: '',
            temperature: 0,
            humidity: 0,
            wdescription: '',
            error: false
        };
    }
    static path = '/forecast';

    componentDidMount() {
        this.getCitiesList();
        this.getPageData();
    }
    getPageData() {
        console.log('%cPage Data', 'color:darkblue');
        $.ajax({
            url: '/data/' + this.state.page + '.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                //console.log('Data of page:' + JSON.stringify(data));
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

    getCitiesList() {
        console.log('%cCities list', 'color: darkorange');
        $.ajax({
            url: '/data/countries.json',
            dataType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
                'Access-Control-Allow-Origin': '*'
            },
            cache: false,
            success: function (data) {
                //console.log('Data of cities:' + JSON.stringify(data));
                this.setState({
                    countries: data
                });

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    renderCountriesList() {
        const {countries} = this.state;
        if (Object.keys(countries).length > 0) {
            return Object.keys(countries).map((item, index) => {
                return <option key={index} value={item}>{item}</option>;
            });
        }    }
    countryChoose(e) {
        e.preventDefault();
        const choosedCountry = e.target.value;

        const {countries} = this.state;
        let cities = [];
        let citiesOption = '';
        if (Object.keys(countries).length > 0) {
            cities = countries[choosedCountry];

            citiesOption = cities.map((cite, ind) => {
                return  <option key={ind} value={cite}>{cite}</option>;
            });

            this.setState({choosedCountry: choosedCountry, cities: citiesOption});
            $('#citiesList').show('slow');
            $('#btnSearch').hide('slow');
            $('#weatherComp').hide('slow');
        }
    }

    /**
     *
     */
    chooseCity() {
        $('#btnSearch').show('slow');
    }
    showWeatherCity = async function() {
        const theCity = this.refs.theCity.value;
        $('#delay').show('slow');

        const { choosedCountry } = this.state;

        if (theCity && choosedCountry) {
            const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${theCity},${choosedCountry}&appid=${API_KEY}&units=metric`);
              /*  .then(res=>{
                    if(res.ok){
                        return res.json();
                    }else{
                        return Promise.reject({ status: res.status, statusText: res.statusText });
                    }
                    $('#delay').hide('slow', function() {
                        $('#weatherComp').show('slow');
                    });
                })
                .then(res=>console.log(res))
                .catch(err=>console.log('Error, with message:', err.statusText));*/
            const data = await apiCall.json();
            //console.log('%cData:' + JSON.stringify(data),'color: blue');
            $('#delay').hide('slow', function() {
                $('#weatherComp').show('slow');
            });

            this.setState({
                temperature: data.main.temp,
                humidity: data.main.humidity,
                wdescription: data.weather[0].description,
                choosedCity: theCity,
                error: undefined
            });
        } else {
            this.setState({
                temperature: undefined,
                humidity: undefined,
                wdescription: undefined,
                error: 'Please enter the value'
            });
        }

    }

    render() {
        const {title, description, cities, temperature, humidity, wdescription, error, choosedCity, choosedCountry} = this.state;
        return (
                <div id='forecat_page'>
                    <article>
                        <header><h2>{title}</h2></header>

                        <section>
                            <p>{description}</p>
                        </section>
                        <section>
                            <div className='col-md-3 col-xs-12'>
                                <select id='countriesList'  onChange={this.countryChoose.bind(this)} size='20'>
                                    <option>Choose Country</option>
                                    {this.renderCountriesList()}
                                </select>
                            </div>
                            <div className='col-md-3 col-xs-12'>
                                <select ref='theCity' id='citiesList' size='20' onChange={this.chooseCity.bind(this)}>
                                    <option>Choose City</option>
                                    {cities}
                                </select>
                            </div>
                            <div className='col-md-2 col-xs-12 text-center'>
                                <button id='btnSearch' type='button' onClick={this.showWeatherCity.bind(this)} className='btn btn-primary btn-lg'><span className='glyphicon glyphicon-search'></span>&nbsp;Search</button>
                            </div>
                            <div  className='col-md-4 col-xs-12 '>
                                    <span id='delay' className='spinner rotate'>&nbsp;</span>
                                    <Weather temperature={temperature} humidity={humidity} description={wdescription} error={error}  city={choosedCity} country={choosedCountry} />
                            </div>
                        </section>
                    </article>
                </div>
                );
    }

}

export default Forecast;
