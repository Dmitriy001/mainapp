import React, { Component } from 'react';
import axios from 'axios'
import Table from './Table'
import './App.css';
import DemoComponent from "./DemoComponent";

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
        this.state = {
            items: this.props.items,
            currentPageItems: this.props.items.slice(0,PAGESIZE),
            sortIndex: null,
            currentIndex: 0,
            anotherData: false
        }
    }

    handleClickPrev = () => {
        let currentIndex = this.state.currentIndex-PAGESIZE;
        if (currentIndex>=0) {
            this.setState({
                currentPageItems: this.state.items.slice(currentIndex,currentIndex+PAGESIZE),
                currentIndex
            })
        }
    };

    handleClickNext = () => {
        let currentIndex = this.state.currentIndex+PAGESIZE;
        let value = this.state.items.length-currentIndex+PAGESIZE;
        if (value <= PAGESIZE) {
            return;
        }
        if (currentIndex < this.state.items.length) {
            this.setState({
                currentPageItems: this.state.items.slice(currentIndex,currentIndex+PAGESIZE),
                currentIndex
            })
        } else if (currentIndex + 50 > this.state.items.length){
            this.setState({
                currentPageItems: this.state.items.slice(currentIndex,currentIndex+value),
                currentIndex: this.state.currentIndex+value
            });
        }
    };

    sortItemsBy = (e) => {
        e.preventDefault();
        let sortItems = this.state.items;
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
        this.setState({
            items: sortItems,
            sortIndex: sortindex,
            currentPageItems: sortItems.slice(this.state.currentIndex, this.state.currentIndex+50)
        })
    };

    filterItemsBy = (event) => {
        if (event.which === 13 || event.keyCode === 13) {
            if (!event.target.value) {
                alert('Please try again');
                return
            }
            let value = event.target.value;
            event.target.value='';
            let filterItems = this.state.items;
            let filterList = filterItems.filter((elements) => {
                let i = 0;
                elements.forEach((element)=>{
                    if (element.toString().indexOf(value)+1) {
                        i++
                    }
                });
                return i>0;
            });

            this.setState({
                items: filterList,
                currentPageItems: filterList.slice(this.state.currentIndex, this.state.currentIndex+50),
                resetButton: true
            })
        }
    };

    resetFilter = () => {
        this.setState({
            items: this.props.items,
            currentPageItems: this.props.items.slice(this.state.currentIndex, this.state.currentIndex+50),
            resetButton: false
        })
    };

    createAnotherData = () => {
        this.setState({
            anotherData: true
        })
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
                <input type='text' placeholder='filter' onKeyPress={this.filterItemsBy}/>
                {this.state.resetButton && <input value='reset filter' type="button" onClick={this.resetFilter}/>}
                <table>
                    <thead>
                    <tr>
                        <th><a href='/' data-sortindex='0' onClick={this.sortItemsBy}>{this.props.headTable.id}</a></th>
                        <th><a href='/' data-sortindex='1' onClick={this.sortItemsBy}>{this.props.headTable.name}</a></th>
                        <th><a href='/' data-sortindex='2' onClick={this.sortItemsBy}>{this.props.headTable.price}</a></th>
                        <th><a href='/' data-sortindex='3' onClick={this.sortItemsBy}>{this.props.headTable.quantity}</a></th>
                    </tr>
                    </thead>
                    <Table items={this.state.currentPageItems}/>
                </table>
                <input type='button' value='create another table' onClick={this.createAnotherData}/>
                {this.state.anotherData && <DemoComponent/>}
            </div>
        )
    }
}

export default GetResponseApp