import React from 'react';
// import { Form, Button } from 'react-bootstrap';

class LocationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            myLocation: '',
            isAccess: false,
            isSubmitted: false,
            errorMsg: '',
            myCountry: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({
            isSubmitted: true
        });

        if (this.state.isAccess) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                this.setState({
                    myLocation: position.coords.latitude + ',' + position.coords.longitude
                });
            });
        }

        fetch("https://ipinfo.io/json?token=0709bcaa3d2342").then(
            (response) => response.json()
        ).then(
            (jsonResponse) => {
                console.log(jsonResponse);
                this.setState({
                    myCountry: `${jsonResponse.region},${jsonResponse.country}`
                });
            })

    }

    componentDidMount() {
        if (navigator.geolocation) {
            this.setState({
                errorMsg: 'Location Access provided',
                isAccess: true
            });
        } else {
            this.setState({
                errorMsg: 'Location Access not provided',
                isAccess: false
            });
        }


    }

    render() {

        let locationForm;



        if (this.state.isSubmitted) {
            locationForm = (
                <div className=''>
                    Here is : {this.state.myCountry}
                </div>
            );
            console.log(this.state.myLocation);
        } else {
            locationForm = (
                <form onSubmit={() => { this.handleSubmit() }}>
                    <input className="btn-primary" type="submit" value="Get my location" />
                    {/* <Button variant="info" type="submit">Get my location</Button> */}
                </form>
            );
        }


        return (
            <div className='container'>
                {/* hello2 */}
                <p>{this.state.errorMsg}</p>
                {locationForm}
            </div>
        );
    }
}

export default LocationForm;
