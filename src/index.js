import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import { widgetReducer} from "./reducers/widgetReducer";
import {App} from "./containers/widgetList";


let store = createStore(widgetReducer)



ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>,
    document.getElementById('root')
)