import React from 'react';
import * as db from '../db';

class FlightsMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { collection: [] };
    }

    componentDidUpdate()
    {
        db.getCollection(this.props.activeNav).then(array =>
        {
            if (this.state.collection.length !== array.length)
                this.setState({ collection: array });
        });
    }

    componentWillMount()
    {
        db.getCollection(this.props.activeNav).then(array => this.setState({ collection: array }));
    }

    componentWillUpdate()
    {
        db.getCollection(this.props.activeNav).then(array =>
        {
            if (this.state.collection.length !== array.length)
                this.setState({ collection: array });
        });
    }

    search()
    {
        const array = this.state.collection;
        const search = document.getElementById('search').value.toLowerCase();

        for (let i = 0; i < array.length; i++)
        {
            const flight = array[i];
            const element = document.getElementById('row_' + flight.flightId);

            if (flight.flight_num.toLowerCase().includes(search))
                element.style.display = 'table-row';
            else
                element.style.display = 'none';
        }

        this.setState({ collection: array });
    }

    render()
    {
        const role = db.getCookie('role');
        if (role === '')
        {
            window.location.replace('/');
            return <div></div>;
        }

        const array = this.state.collection;

        if (array.length > 0)
        {
            const search = (
                <form>
                    <div className="form-row">
                        <div className="col">
                            <input id="search" type="text" className="form-control" placeholder="Enter a Flight # to search" onChange={() => this.search()}></input>
                        </div>
                    </div>
                </form>
            );

            const rows = array.map(obj =>
                <tr id={'row_' + obj.flightId} key={obj.flightId}>
                    <td><a href={'#' + obj.flight_num}>{obj.flight_num}</a></td>
                    <td>{obj.from_airport}</td>
                    <td>{obj.to_airport}</td>
                    <td>{db.parseDateTime(obj.departure_date)}</td>
                    <td>{db.parseDateTime(obj.arrival_date)}</td>
                    <td>{obj.economy_price}</td>
                    <td>{obj.business_price}</td>
                </tr>
            );

            return (
                <div>
                    {search}
                    <br></br>
                    <table className="table table-striped" border="2">
                        <thead>
                            <tr>
                                <th scope="col">Flight #</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Departure</th>
                                <th scope="col">Arrival</th>
                                <th scope="col">Economy Price</th>
                                <th scope="col">Business Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            );
        }

        return <div id="loading">Loading...</div>;
    }
}

export default FlightsMenu;