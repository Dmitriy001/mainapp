import React, {Component} from "react";
import DemoComponent from "./DemoComponent";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            sortIndex: null,
            resetButton: false,
            anotherData: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items
        })
    }

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
            sortIndex: sortindex
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
                resetButton: true
            })
        }
    };

    resetFilter = () => {
        this.setState({
            items: this.props.items,
            resetButton: false
        })
    };

    createAnotherData = () => {
        this.setState({
            anotherData: true
        })
    };

    render() {
        let rows = this.state.items.map((item)=>
            <tr key={item.toString()}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3].toString()}</td>
            </tr>
        );
        return(
            <div className='Table'>
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
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                <input type='button' value='create another table' onClick={this.createAnotherData}/>
                {this.state.anotherData && <DemoComponent/>}
            </div>
        )
    }
}

export default Table
