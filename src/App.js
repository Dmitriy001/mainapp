import React, { Component } from 'react';
import axios from 'axios'
import Table from './Table'
import './App.css';


class GetResponseApp extends Component {
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



class MainApp extends Component {
    constructor(props) {
        super(props);
        let arr = this.props.items.slice(0, 50);
        this.state = {
            currentPageItems: arr,
            currentIndex: 0
        }
    }

    handleClickPrev() {
        let currentIndex = this.state.currentIndex-50;
        if (currentIndex>0) {
            this.setState({
                currentPageItems: this.props.items.slice(currentIndex,currentIndex+50),
                currentIndex
            })
        }
    }

    handleClickNext(){
        let currentIndex = this.state.currentIndex+50;
        let value = this.props.items.length-currentIndex+50;
        if (value < 50) {
            return;
        }
        if (currentIndex < this.props.items.length) {
            this.setState({
                currentPageItems: this.props.items.slice(currentIndex,currentIndex+50),
                currentIndex
            })
        } else if (currentIndex + 50 > this.props.items.length){
            this.setState({
                currentPageItems: this.props.items.slice(currentIndex,currentIndex+value),
                currentIndex: this.state.currentIndex+value
            });
        }
    }

    render() {
        return(
            <div className='MainApp'>
                <button onClick={this.handleClickPrev.bind(this)}>
                    Prev
                </button>
                <button onClick={this.handleClickNext.bind(this)}>
                    Next
                </button>
                <Table items={this.state.currentPageItems} headTable={this.props.headTable}/>
            </div>
        )
    }
}





export default GetResponseApp