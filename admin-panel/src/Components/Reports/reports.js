import React,{Component} from 'react'


export default class Reports extends Component{

    constructor(props){
        super(props)

        this.state= {
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


    handleClickAgree(e) {
        e.preventDefault();
        let data = {
            agreed:true,
            id: this.state.reports[this.state.reports.length - 1].id + 1
        };
        var request = new Request('http://localhost:3000/report', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        let report = this.state.reports;
        report.push(data);
        this.setState({
            reports: report
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
            id: this.state.reports[this.state.reports.length - 1].id + 1
        };
        var request = new Request('http://localhost:3000/report', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        let report = this.state.reports;
        report.push(data);
        this.setState({
            reports: report
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
        let reports = this.state.reports
        return(
            <div>
                {reports.map(report=>{
                    if(report.agreed===null) {
                    return (
                        <div key={report.id}>
                            <div>
                                {report.name} is doing {report.description} , estimation
                                is {report.estimation} spent {report.spent}
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
                else if (report.agreed === true) {
                        return (
                            <div key={report.id}>
                                <div>
                                    {report.name} is doing {report.description} , estimation
                                    is {report.estimation} spent {report.spent}
                                </div>
                                <p> Your report accepted</p>
                            </div>

                        )
                    }

                    else  {
                        return (
                            <div key={report.id}>
                                <div>
                                    {report.name} is doing {report.description} , estimation
                                    is {report.estimation} spent {report.spent}
                                </div>
                                <p> Your report ignored</p>
                            </div>

                        )
                    }

                })}

            </div>


        )
    }
}