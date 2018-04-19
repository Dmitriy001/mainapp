import React, {Component} from 'react'
import GetResponseApp from './App'

class DemoComponent extends Component{
    constructor() {
        super();
        this.state={
        }
    }

    handleClick = (e) => {
        this.setState({
            data: e.target.name
        })
    };

    render() {
        return (
            <div className='DemoComponent'>
                <div className="buttons" style={{display: this.state.data ? 'none': ''}}>
                    Please choose :
                    <input value='small data' name='data' type='button' onClick={this.handleClick}/>
                    <input value='big data' name='bigdata' type='button' onClick={this.handleClick}/>
                    <p>
                        <form >
                            <input placeholder='create own data' />
                            <input type='submit' value='submit'/>
                        </form>
                    </p>
                </div>
                {this.state.data && <GetResponseApp data={this.state.data}/>}
            </div>
        )
    }
}

export default DemoComponent
