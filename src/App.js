import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/data')
            .then(response => {
                const [hash, ...items] = response.data;
                // this.setState({hash: hash,
                //     items: items
                // });
            }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="App">
                {/*{this.state.items ? <Ul items={this.state.items}/> : ''}*/}
            </div>
        );
    }
}

export default App;
