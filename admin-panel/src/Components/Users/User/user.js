import React, {Component} from 'react'

import './user.css'

export default class Notification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        console.log('Component Mounted');
        var that = this;
        fetch('http://localhost:3000/users/user')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.setState({
                            users: data
                        })
                    })
            })
    }

    render() {

        function any(){
            return this.props.callfromparent(this.state.users.id)
        }
        let users = this.state.users
        return (
            <div>
                <div className="head">
                    <div>Name</div>
                    <div>Lastname</div>
                    <div>Profesional</div>
                </div>
                <div className="user">
                    <div>{users.map(user =>
                        <div> {user.name}</div>
                    )}
                    </div>
                    <div>{users.map(user =>
                        <div> {user.lastname}</div>
                    )}
                    </div>
                    <div>{users.map(user =>
                        <div> {user.profession}</div>
                    )}
                    </div>
                </div>
            </div>
        )
    }

}