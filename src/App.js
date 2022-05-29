import './App.css';
import MainUser from './Components/Home/MainUser';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import discussions from './Components/Discussions/discussions';
import resources from './Components/Resources/resources';

import { UserProvider } from './Components/Services/UserContext';
import { AssignmentsProvider } from './Components/Services/AssignmentsContext';

function App() {
    return (
        <UserProvider>
        <AssignmentsProvider>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={discussions} />
                <Route path='/Home' component={MainUser} />
                <Route path='/Resources' component={resources} />
                <Route path='/Login' component={Login} />
                <Route path='/Register' component={Register} />
            </Switch>
        </BrowserRouter>
        </AssignmentsProvider>
        </UserProvider>

    );
}

export default App;