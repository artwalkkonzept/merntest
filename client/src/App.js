import React, {Component} from 'react';
import {Router} from "@reach/router";
import Artwalk from "./Artwalk";
import Artwalks from "./Artwalks";

import Gallery from "./Component/Gallery";

class App extends Component {
    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            artwalks: []
        };
    }

    componentDidMount() {
        // Get everything from the API
        this.getArtwalks().then(() => console.log("Artwalks got it!"));
    }

    async getArtwalks() {
        let url = `${this.API_URL}/artwalks`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            artwalks: json
        })
    }

    getArtwalk(id) {
        // Find the relevant artwalk by id
        return this.state.artwalks.find(k => k._id === id);
    }

    render() {
        return (
            <>
                <Router>
                    <Artwalk path="/artwalk/:id" getArtwalk={id => this.getArtwalk(id)}/>
                    <Artwalks path="/" artwalks={this.state.artwalks}/>
                </Router>
                <Gallery/>
            </>
        );
    }
}

export default App;
