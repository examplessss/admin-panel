import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Login from './Components/Login/login'
import Users from './Components/Users/users';
import Reports from "./Components/Reports/reports";
import Notification from "./Components/Notification/notification";
import './App.css';
export default class App extends Component{

constructor(props){
    super(props)
    this.state={
        anything:[]
    }
}




    render() {



        return (
            <Router className="App">

             <Route exact path="/reports" component={Reports}/>
             <Route exact path="/notification" component={Notification}/>
             <Route exact path="/" component={Login}/>
             <Route exact path="/users" component={Users}/>

            </Router>

        );
    }


}
