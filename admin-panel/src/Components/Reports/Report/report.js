import React, {Component} from 'react'

export default class Report extends Component {
    constructor(props){
        super(props)
        this.state={
            report:[]
        }

    }

    handleClickAgree(e) {
        e.preventDefault();
        let data = {
            agreed:true,
            id:this.props.reports.id
        };
        var request = new Request('http://localhost:3000/report', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        let report = this.state.report;
        report.push(data);
        this.setState({
            report: report
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

    handleClickIgnore(e) {
        e.preventDefault();
        let data = {
            agreed:false,
            id:this.props.reports.id
        };
        var request = new Request('http://localhost:3000/report', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        let report = this.state.report;
        report.push(data);
        this.setState({
            report: report
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
        let reports = this.props.reports
     if(reports.agreed===null) {
            return (
                <div>
                    <div>
                        {reports.name} is doing {reports.description} , estimation
                        is {reports.estimation} spent {reports.spent}
                    </div>

                    <button type="button" className="btn btn-success"
                            onClick={this.handleClickAgree.bind(this)}>Confirm
                    </button>
                    <button type="button" className="btn btn-danger"
                            onClick={this.handleClickIgnore.bind(this)}>Cancel
                    </button>

                </div>
            )
        }
       else if (reports.agreed === true) {
            return (
                <div>
                    <div>
                        {reports.name} is doing {reports.description} , estimation
                        is {reports.estimation} spent {reports.spent}
                    </div>
                    <p> Your report accepted</p>
                </div>

            )
        }

       else if (reports.agreed === false) {
            return (
                <div>
                    <div>
                        {reports.name} is doing {reports.description} , estimation
                        is {reports.estimation} spent {reports.spent}
                    </div>
                    <p> Your report ignored</p>
                </div>

            )
        }

    }

}