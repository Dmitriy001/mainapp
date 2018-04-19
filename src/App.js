import React, { Component } from 'react';
import axios from 'axios'
import Table from './Table'
import './App.css';


class GetResponseApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/${this.props.data}`)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                const [headTable, ...items] = response;
                this.setState({headTable,
                    items
                });
            })
            .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                {this.state.items && <MainApp headTable={this.state.headTable} items={this.state.items}/>}
            </div>
        );
    }
}

const PAGESIZE = 50;

class MainApp extends Component {
    constructor(props) {
        super(props);
        let arr = this.props.items.slice(0, PAGESIZE);
        this.state = {
            currentPageItems: arr,
            currentIndex: 0
        }
    }

    handleClickPrev = () => {
        let currentIndex = this.state.currentIndex-PAGESIZE;
        if (currentIndex>=0) {
            this.setState({
                currentPageItems: this.props.items.slice(currentIndex,currentIndex+PAGESIZE),
                currentIndex
            })
        }
    };

    handleClickNext = () => {
        let currentIndex = this.state.currentIndex+PAGESIZE;
        let value = this.props.items.length-currentIndex+PAGESIZE;
        if (value <= PAGESIZE) {
            return;
        }
        if (currentIndex < this.props.items.length) {
            this.setState({
                currentPageItems: this.props.items.slice(currentIndex,currentIndex+PAGESIZE),
                currentIndex
            })
        } else if (currentIndex + 50 > this.props.items.length){
            this.setState({
                currentPageItems: this.props.items.slice(currentIndex,currentIndex+value),
                currentIndex: this.state.currentIndex+value
            });
        }
    };

    render() {
        return(
            <div className='MainApp'>
                <button onClick={this.handleClickPrev}>
                    Prev page
                </button>
                <button onClick={this.handleClickNext}>
                    Next page
                </button>
                <Table items={this.state.currentPageItems} headTable={this.props.headTable}/>
            </div>
        )
    }
}

export default GetResponseApp