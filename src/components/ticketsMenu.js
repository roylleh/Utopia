import React from 'react';
import * as db from '../db';

class BookLoansMenu extends React.Component
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

    deleteElement(id)
    {
        db.deleteElement(this.props.activeNav + id);
        this.componentDidMount();
    }

    search()
    {
        const array = this.state.collection;
        const search = document.getElementById('search').value.toLowerCase();

        for (let i = 0; i < array.length; i++)
        {
            const ticket = array[i];
            const element = document.getElementById('row_' + ticket.ticketId);

            if (ticket.ticket_num.toLowerCase().includes(search))
                element.style.display = 'table-row';
            else
                element.style.display = 'none';
        }

        this.setState({ collection: array });
    }

    render()
    {
        const role = db.getCookie('role');
        if (role !== 'agent' && role !== 'counter')
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
                            <input id="search" type="text" className="form-control" placeholder="Enter a Ticket # to search" onChange={() => this.search()}></input>
                        </div>
                    </div>
                </form>
            );

            const rows = array.map(obj =>
                <tr id={'row_' + obj.ticketId} key={obj.ticketId}>
                    <td><a href={'#' + obj.ticket_num}>{obj.ticket_num}</a></td>
                    <td>{obj.passenger_name}</td>
                    <td>{obj.passenger_age}</td>
                    <td>{obj.price}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => this.deleteElement('/' + obj.ticketId)}>Cancel</button>
                    </td>
                </tr>
            );

            return (
                <div>
                    {search}
                    <br></br>
                    <table className="table table-striped" border="2">
                        <thead>
                            <tr>
                                <th scope="col">Ticket #</th>
                                <th scope="col">Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
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

export default BookLoansMenu;