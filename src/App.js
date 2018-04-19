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
                this.setState({hash,
                    items
                });
            })
            .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.items && <Table hash={this.state.hash} items={this.state.items}/>}
            </div>
        );
    }
}




class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 50,
            items: this.props.items,
            sortIndex: null
        }
    }

    handleClickPrev() {
        if (this.state.counter % 50 !== 0) {
            this.setState({
                counter: this.state.counter - 50
            })
        }
        else if(this.state.counter > 50) {
            this.setState({
                counter: this.state.counter - 50
            })
        }
    }

    handleClickNext(){
        let l = this.props.items.length;
        let count = this.state.counter;

        if (l-count <= 50 && l-count > 0) {
            this.setState({
                counter: count+50
            })
        } else if (l > count) {
            this.setState({
                counter: count + 50
            })
        }
    }

    sortItemsBy(e) {
        e.preventDefault();
        let sortItems = this.state.items.slice(this.state.counter-50, this.state.counter);
        const sortindex = +e.target.dataset.sortindex;
        if (this.state.sortIndex === null || sortItems[0][sortindex] > sortItems[sortItems.length-1][sortindex]) {
            sortItems.sort((a,b) => {
                if (a[sortindex] === b[sortindex]) {
                    return 0
                }
                return a[sortindex] > b[sortindex] ? 1 : -1
            });
        } else {
            sortItems.sort((a,b) => {
                if (a[sortindex] === b[sortindex]) {
                    return 0
                }
                return a[sortindex] > b[sortindex] ? -1 : 1
            });
        }


        let itemsFirstPart = this.state.items.slice(0, this.state.counter-50);
        let itemsSecondPart = this.state.items.slice(this.state.counter);
        let a = itemsFirstPart.concat(sortItems);
        let b = a.concat(itemsSecondPart);
        this.setState({
            items: b,
            sortIndex: sortindex
        })
    }

    filterItemsBy(event) {
        if (event.which === 13 || event.keyCode === 13) {

            let value = event.target.value;
            event.target.value='';
            let filterItems = this.state.items.slice(this.state.counter-50, this.state.counter);
            let filterList = filterItems.filter((elements) => {
                let i = 0;
                elements.forEach((element)=>{
                    if (element.toString().indexOf(value)+1) {
                        i++
                    }
                });
                return i>0;
            });

            //must be separate method
            let itemsFirstPart = this.state.items.slice(0, this.state.counter-50);
            let itemsSecondPart = this.state.items.slice(this.state.counter);
            let a = itemsFirstPart.concat(filterList);
            let b = a.concat(itemsSecondPart);
            this.setState({
                items: b
            })
        }
    }


    render() {
        const items = this.state.items;
        const hash = this.props.hash;
        let rows = [];
        for (let i = this.state.counter - 50; i < this.state.counter; i++) {
            if (items[i] === undefined) break;
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
                <input type='text' placeholder='filter' onKeyPress={this.filterItemsBy.bind(this)}/>
                <table>
                    <thead>
                        <tr>
                            <th><a href='/' data-sortindex='0' onClick={this.sortItemsBy.bind(this)}>{hash.id}</a></th>
                            <th><a href='/' data-sortindex='1' onClick={this.sortItemsBy.bind(this)}>{hash.name}</a></th>
                            <th><a href='/' data-sortindex='2' onClick={this.sortItemsBy.bind(this)}>{hash.price}</a></th>
                            <th><a href='/' data-sortindex='3' onClick={this.sortItemsBy.bind(this)}>{hash.quantity}</a></th>
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