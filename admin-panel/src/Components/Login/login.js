import React,{Component} from 'react'

import './login.css'
export default class Login extends Component{

    constructor(props){
        super(props)

        this.state={
            name:"",
            names:[]
        }
    }

    componentDidMount() {
        console.log('Component Mounted!');
        let that = this;
        fetch('http://localhost:3000/login')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.setState({
                            names:data
                        })
                    })
            })
    }


    render() {
        let names = this.state.names
        return(
            <form className="form-inline">
                <div className="col-auto my-1">
                    <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Preference</label>
                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                        <option selected>Choose...</option>
                        <option value="1">Administrator</option>
                        <option value="2">PM</option>
                        <option value="3">developer</option>
                    </select>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="inputPassword2" className="sr-only">Password</label>
                    <input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={this.onclick}>Confirm identity</button>
            <ul>
                {names.map(name=><li>{name.roles}</li>)}
            </ul>
            </form>
        )
    }
}