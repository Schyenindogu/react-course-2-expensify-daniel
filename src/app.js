import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import AppRouter, { history } from './routers/AppRouter'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import getVisibleExpenses from './selectors/expenses'
import { firebase } from './firebase/firebase'



import { Provider } from 'react-redux'

// THIS IS HOW YOU CONNECT REDUX AND REACT ////

import configureStore from './store/configureStore'

const store = configureStore()

const jsx = (
    <Provider store={store}>
     <AppRouter />
    </Provider>
)

let hasRendered = false
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user){
        store.dispatch(login(user.uid))
        console.log('uid', user.uid)
        store.dispatch(startSetExpenses()).then(() => {
            renderApp()
            if(history.location.pathname === '/') {
                history.push('/dashboard')
            }
        })
    } else {
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})