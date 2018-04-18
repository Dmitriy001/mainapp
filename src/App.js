import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/data')
            .then((response)=> {
                return response.data
            })
            .then((response)=>{

                const [hash, ...items] = response;
                console.log(items);
                this.setState({hash: hash,
                    items: items
                });
            })
            .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.items ? <Table hash={this.state.hash} items={this.state.items}/> : ''}
            </div>
        );
    }
}


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 50
        }
    }

    handleClickPrev() {
        if (this.state.counter%50 !== 0) {
            this.setState({
                counter: this.state.counter - this.state.counter%50
            })
        }
        else if(this.state.counter>50) {
            this.setState({
                counter: this.state.counter-50
            })
        }
    }

    handleClickNext(){
        let l = this.props.items.length;
        let count = this.state.counter;

        if (l-count <= 50 && l-count > 0) {
            this.setState({
                counter: l
            })
        } else if (l > count) {
            this.setState({
                counter: count + 50
            })
        }
// must be disable
    }

    render() {
        const items = this.props.items;
        const hash = this.props.hash;
        let rows = [];
        for (let i=this.state.counter -50; i < this.state.counter; i++) {
            rows.push(
                <tr key={items[i].toString()}>
                    <td>{items[i][0]}</td>
                    <td>{items[i][1]}</td>
                    <td>{items[i][2]}</td>
                    <td>{items[i][3].toString()}</td>
                </tr>
            )
        }

        return(
            <div>
                <button onClick={this.handleClickPrev.bind(this)}>
                    Prev
                </button>
                <button onClick={this.handleClickNext.bind(this)}>
                    Next
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>{hash.id}</th>
                            <th>{hash.name}</th>
                            <th>{hash.price}</th>
                            <th>{hash.quantity}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App