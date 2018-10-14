import React from 'react';
import * as db from '../db';

class UsersMenu extends React.Component
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
            const user = array[i];
            const element = document.getElementById('row_' + user.userId);

            if (user.email.toLowerCase().includes(search) || user.name.toLowerCase().includes(search))
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
                            <input id="search" type="text" className="form-control" placeholder="Enter an email or name to search" onChange={() => this.search()}></input>
                        </div>
                    </div>
                </form>
            );

            const rows = array.map(obj =>
                <tr id={'row_' + obj.userId} key={obj.userId}>
                    <td>{obj.email}</td>
                    <td>{obj.name}</td>
                </tr>
            );

            return (
                <div>
                    {search}
                    <br></br>
                    <table className="table table-striped" border="2">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
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

export default UsersMenu;