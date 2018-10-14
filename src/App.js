import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import * as db from './db';
import FlightsMenu from './components/flightsMenu';
import ReservationsMenu from './components/reservationsMenu';
import TicketsMenu from './components/ticketsMenu';
import UsersMenu from './components/usersMenu';
import logo from './logo.svg';
import './App.css';

class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { valid: '' };
    }

    logout()
    {
        document.cookie = 'userId=;';
        document.cookie = 'role=;';
        window.location.replace('/');
    }

    render()
    {
        const role = db.getCookie('role');
        const activeNav = this.props.activeNav;
        let navs =
        {
            flights: <Link to="flights" className="nav-item nav-link">Flights</Link>,
            reservations: <Link to="reservations" className="nav-item nav-link">Reservations</Link>,
            tickets: <Link to="tickets" className="nav-item nav-link">Tickets</Link>,
            users: <Link to="users" className="nav-item nav-link">Users</Link>
        };
        navs[activeNav] = <Link to={activeNav} className="nav-item nav-link active">{activeNav[0].toUpperCase() + activeNav.slice(1)}</Link>;

        return (
            <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
                <span className="navbar-brand">
                    <img alt="" className="react-logo" src={logo} />
                    Utopia
                </span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto">
                        {role !== '' && navs.flights}
                        {role !== '' && navs.reservations}
                        {(role === 'agent' || role === 'counter') && navs.tickets}
                        {(role === 'agent' || role === 'counter') && navs.users}
                    </div>
                    <Link className="nav-item nav-text" to="#" onClick={() => this.logout()}>Logout</Link>
                </div>
            </nav >
        );
    }
}

class Login extends React.Component
{
    login()
    {
        const user =
        {
            email: document.getElementById('inputEmail').value,
            password: document.getElementById('inputPassword').value
        };

        db.login(user).then(result =>
        {
            if (result.email && result.password)
            {
                document.cookie = 'userId=' + result.userId + ';';
                document.cookie = 'role=' + result.role + ';';
                this.setState({ valid: 'true' });
            }
            else
                this.setState({ valid: 'false' });
        });
    }

    render()
    {
        const role = db.getCookie('role');
        if (role !== '')
        {
            window.location.replace('/flights');
            return <div></div>;
        }

        const error = <div class="alert alert-danger" role="alert">Invalid email or password.</div>;

        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="name@example.com">
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="password123">
                        </input>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => this.login()}>Login</button>
                </form>
                <br></br>
                {this.state && this.state.valid === 'false' && error}
            </div >
        );
    }
}

class App extends React.Component
{
    render()
    {
        return (
            <div className="container" >
                <Switch>
                    <Route exact path="/" render={(props) => <Redirect {...props} to="/login" />} />
                    <Route exact path="/login" render={(props) => <Header {...props} activeNav="login" />} />
                    <Route exact path="/flights" render={(props) => <Header {...props} activeNav="flights" />} />
                    <Route exact path="/reservations" render={(props) => <Header {...props} activeNav="reservations" />} />
                    <Route exact path="/tickets" render={(props) => <Header {...props} activeNav="tickets" />} />
                    <Route exact path="/users" render={(props) => <Header {...props} activeNav="users" />} />
                </Switch>
                <div id="utopia-container">
                    <Switch>
                        <Route exact path="/" render={(props) => <Redirect {...props} to="/login" />} />
                        <Route exact path="/login" render={(props) => <Login {...props} activeNav="login" />} />
                        <Route exact path="/flights" render={(props) => <FlightsMenu {...props} activeNav="flights" />} />
                        <Route exact path="/reservations" render={(props) => <ReservationsMenu {...props} activeNav="reservations" />} />
                        <Route exact path="/tickets" render={(props) => <TicketsMenu {...props} activeNav="tickets" />} />
                        <Route exact path="/users" render={(props) => <UsersMenu {...props} activeNav="users" />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;