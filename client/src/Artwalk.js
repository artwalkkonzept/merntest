import React, {Component} from 'react';
import {Link} from "@reach/router";

class Artwalk extends Component {
    render() {
        const artwalk = this.props.getArtwalk(this.props.id);
        let content = <p>Loading</p>;
        if (artwalk) {
            content =
                <>
                    <h1>{artwalk.name}</h1>

                    <h3>Bilds</h3>
                    <ul>
                        {artwalk.bilds.map(h => <li key={h}>{h}</li>)}
                    </ul>

                    <Link to="/">Back</Link>
                </>
        }
        return content;
    }
}

export default Artwalk;
