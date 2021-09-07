import React, {Component} from 'react';
import {Link} from "@reach/router";

class Artwalks extends Component {

    render() {
        const artwalks = this.props.artwalks.map(artwalk =>
            <li key={artwalk._id}>
                <Link to={`/artwalk/${artwalk._id}`}>{artwalk.name}</Link>
            </li>
        );
        return (
            <>
                <h1>Artwalks</h1>
                <ol>
                    {artwalks}
                </ol>
            </>
        );
    }

}

export default Artwalks;
