import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import AddExpensePage from '../components/AddExpensePage'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'  
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
        <Route path="/" component={LoginPage} exact={true}/>
          <PrivateRoute path="/create" component={AddExpensePage}/>
          <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
          <Route path="/help" component={HelpPage}/>
          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
          <Route component={NotFoundPage} />
        </Switch>
    </div>
    </Router>
)

export default AppRouter