import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'



const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => response.json())
        .then(widgets => dispatch({
                type: 'FIND_ALL_WIDGETS',
                widgets: widgets
        }
        ))
}

const Widget =({widget, dispatch}) => (
    <li >{widget.id}  {widget.text}
    <button onClick={e => (
        dispatch({type : 'DELETE_WIDGET', id: widget.id})
    )}>Delete</button></li>
)

let initialState ={
    widgets: [
        {id: 0, text: 'Widget 1'},
        {id: 1, text: 'Widget 2'},
        {id: 2, text: 'Widget 3'}
    ]
}


const WidgetContainer = connect()(Widget)

class WidgetList extends Component {
    // ({widgets, dispatch})


    constructor(props){
        super(props)
        this.props.findAllWidgets()
    }

    render() {
        return (
            <div>
                <h1>Widget List: ({this.props.widgets.length})</h1>
                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget} key={widget.id}/>
                    ))}
                </ul>
                <button onClick={e => (
                    this.props.dispatch({type: 'ADD_WIDGET'})
                )}>Add Widget
                </button>
            </div>
        )
    }
}


let idAutoIncrement = 3

const widgetReducer = (state = {widgets: []}, action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return {
                widgets: [
                    ...state.widgets,
                    {id: idAutoIncrement++, text: 'new widget'}
                ]
            }
        case 'DELETE_WIDGET':
            return {
                widgets : state.widgets.filter(widget => (
                 widget.id !==action.id
            ))}
        case 'FIND_ALL_WIDGETS':
            return {
                widgets : action.widgets
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


const dispatchToPropsMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch)
})

const App = connect(stateToPropertiesMapper, dispatchToPropsMapper)(WidgetList)



ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>,
    document.getElementById('root')
)