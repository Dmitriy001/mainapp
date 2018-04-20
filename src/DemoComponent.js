import React, {Component} from 'react'
import GetResponseApp from './App'

class DemoComponent extends Component{
    constructor() {
        super();
        this.state={
        }
    }

    handleClick = (event) => {
        this.setState({
            data: event.target.name
        })
    };

    handleChange = (event) => {
        if (event.which === 13 || event.keyCode === 13) {
            if (!event.target.value) {
                alert('Please try again');
                return
            }
            this.setState({
                data: 'data?id=' + event.target.value
            })
        }
    };

    render() {
        return (
            <div className='DemoComponent'>

                <div className="buttons" style={{display: this.state.data ? 'none': ''}}>
                    Please choose :
                    <input value='small data' name='smalldata' type='button' onClick={this.handleClick}/>
                    <input value='big data' name='bigdata' type='button' onClick={this.handleClick}/>
                    <p>
                        <input placeholder='input own data and press enter' onKeyPress={this.handleChange}
                        style={{width: 200}}/>
                    </p>
                </div>
                {this.state.data &&
                <div>
                    <GetResponseApp data={this.state.data}/>
                </div>}
            </div>
        )
    }
}

export default DemoComponent
