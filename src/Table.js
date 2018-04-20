import React, {Component} from "react";


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            resetButton: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items
        })
    }




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
                <tbody>
                    {rows}
                </tbody>

        )
    }
}

export default Table
