import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import MailBox from './Pages/MailBox'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/Login" component={Login} />


                <Route path="/DashBoard">
                    <Home>
                        <Route path="/" component={MailBox} />
                    </Home>
                </Route>


            </Switch>
        </Router>
    );
}


export default App;