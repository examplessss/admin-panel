import React, {Component} from 'react'

import './notification.css'

export default class Notification extends Component {

    constructor(props){
        super(props)
        this.state={
            reports:[]
        }
    }

    componentDidMount() {
        console.log('Component Mounted');
        var that = this;
        fetch('http://localhost:3000/reports')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.setState({
                            reports: data
                        })
                    })
            })

    }

    handleClickEnd(e) {
        e.preventDefault();
        let data = {
            name: this.refs.name.value,
            description: this.refs.description.value,
            estimation: this.refs.estimation.value,
            spent: this.refs.spent.value,
            id:this.state.reports[this.state.reports.length-1].id+1,
        };
        var request = new Request('http://localhost:3000/notification', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        let reports = this.state.reports;
        reports.push(data);
        this.setState({
             reports:reports
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
        return (
            <div className="Notes">
                anun@ <input type="text" ref="name"/>
                nkaragrutyun@ <input type="text" ref="description"/>
                gnahatakan@ <input type="text" ref="estimation"/>
                caxsac@ <input type="text" ref="spent"/>
                <button onClick={this.handleClickEnd.bind(this)}>Add report</button>
            </div>
        )
    }

}