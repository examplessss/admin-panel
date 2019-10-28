import React, {Component} from 'react'


import './users.css'

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            IfAdd: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(
            {IfAdd: !this.state.IfAdd}
        )
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

    handleClickEnd(e) {
        e.preventDefault();
        let data = {
            name: this.refs.name.value,
            lastname: this.refs.lastname.value,
            profession: this.refs.profession.value,
            id: this.state.users[this.state.users.length - 1].id + 1,
        };
        var request = new Request('http://localhost:3000/users/user-name', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        let users = this.state.users;
        users.push(data);
        this.setState({
            users: users
        })

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {


                    })
            }).catch(function (err) {
            console.log(err)
        })
    }

    render() {

        let users = this.state.users

        if (this.state.IfAdd) {
            return (
                <div className="users">
                    <div>

                        <div className="head">
                            <div>id</div>
                            <div>Name</div>
                            <div>Lastname</div>
                            <div>Profesional</div>
                        </div>
                        <div className="user">
                            <div>{users.map(user =>
                                <div key={user.id}> {user.id}</div>
                            )}
                            </div>
                            <div>{users.map(user =>
                                <div key={user.id}> {user.name}</div>
                            )}
                            </div>
                            <div>{users.map(user =>
                                <div key={user.id}> {user.lastname}</div>
                            )}
                            </div>
                            <div>{users.map(user =>
                                <div key={user.id}> {user.profession}</div>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="adduser">
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                            </div>
                            <input type="text" ref="name" className="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">LastName</span>
                            </div>
                            <input ref="lastname" type="text" className="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Profesional</span>
                            </div>
                            <input ref="profession" type="text" className="form-control"
                                   aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                    </div>
                    <div id="buttons">
                        <button type="button" className="btn btn-primary" onClick={this.handleClickEnd.bind(this)}>Add
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.handleClick}>Cancel</button>
                    </div>
                </div>
            )
        } else
            return (
                <div className="users">
                    <div>
                        <div className="head">
                            <div>Id</div>
                            <div>Name</div>
                            <div>Lastname</div>
                            <div>Profesional</div>
                        </div>
                        <div className="user">
                            <div>{users.map(user =>
                                <div key={user.id}> {user.id}</div>
                            )}
                            </div>
                            <div>{users.map(user =>
                                <div key={user.id}> {user.name}</div>
                            )}
                            </div>
                            <div>{users.map(user =>
                                <div key={user.id}> {user.lastname}</div>
                            )}
                            </div>
                            <div>{users.map(user =>
                                <div key={user.id}> {user.profession}</div>
                            )}
                            </div>
                        </div>
                    </div>
                    <div id="buttons">
                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Add User</button>
                    </div>
                </div>)
    }


}
