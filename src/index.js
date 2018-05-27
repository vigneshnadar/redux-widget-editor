import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'


let initialState ={
    widgets: [
        {id: 0, text: 'Widget 1'},
        {id: 0, text: 'Widget 2'},
        {id: 0, text: 'Widget 3'}
    ]
}


const WidgetList = ({widgets}) => (
    <div>
        <h1>Widget List: ({widgets.length})</h1>
    </div>
)


const widgetReducer = () => {
    return initialState
}


let store = createStore(widgetReducer)


const stateToPropertiesMapper = (state) => (
    {
        widgets : state.widgets
    }
)

const App = connect(stateToPropertiesMapper)(WidgetList)



ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>,
    document.getElementById('root')
)