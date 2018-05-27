import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'


const Widget =({widget}) => (
    <li >{widget.text}</li>
)

let initialState ={
    widgets: [
        {id: 0, text: 'Widget 1'},
        {id: 1, text: 'Widget 2'},
        {id: 2, text: 'Widget 3'}
    ]
}


const WidgetList = ({widgets, dispatch}) => (
    <div>
        <h1>Widget List: ({widgets.length})</h1>
        <ul>
            {widgets.map(widget => (
                <Widget widget={widget} key={widget.id}/>
            ))}
        </ul>
        <button onClick={e => (
            dispatch({type : 'ADD_WIDGET'})
        )}>Add Widget</button>
    </div>
)


let idAutoIncrement = 3

const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return {
                widgets: [
                    ...state.widgets,
                    {id: idAutoIncrement++, text: 'new widget'}
                ]
            }
        default:
            return state
    }
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