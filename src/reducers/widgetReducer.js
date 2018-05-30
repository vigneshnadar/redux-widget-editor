import {ADD_WIDGET,LINK_URL_CHANGED,PREVIEW,WIDGET_NAME_CHANGED,IMAGE_URL_CHANGED,SELECT_WIDGET_TYPE, HEADING_TEXT_CHANGED,HEADING_SIZE_CHANGED, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE} from "../constants";

let idAutoIncrement = 3

export const widgetReducer = (state = {widgets: [],preview:false}, action) => {

    let newState
    switch (action.type) {

        case LINK_URL_CHANGED:
            // alert("hello")
            return {
                widgets : state.widgets.map((widget) => {
                    if(widget.id === action.id){
                        widget.linkHref = action.linkHref
                    }
                    return Object.assign({},widget)
                })
            }

        case IMAGE_URL_CHANGED:
            // alert("hello")
            return {
                widgets : state.widgets.map((widget) => {
                    if(widget.id === action.id){
                        widget.imageSrc = action.imageSrc
                    }
                    return Object.assign({},widget)
                })
            }

        case WIDGET_NAME_CHANGED:
            // alert("hello")
            return {
                widgets : state.widgets.map((widget) => {
                    if(widget.id === action.id){
                        widget.widgetName = action.widgetName
                    }
                    return Object.assign({},widget)
                })
            }

        case PREVIEW:
            newState = Object.assign({}, state)
            newState.preview = !newState.preview
            // alert("hello")
            return newState

        case HEADING_TEXT_CHANGED:
            // alert("hello")
            return {
                widgets : state.widgets.map((widget) => {
                    if(widget.id === action.id){
                        widget.text = action.text
                    }
                    return Object.assign({},widget)
                })
            }

        case HEADING_SIZE_CHANGED:
            // alert("hello")
            return {
                widgets : state.widgets.map((widget) => {
                    if(widget.id === action.id){
                        widget.size = action.size
                    }
                    return Object.assign({},widget)
                })
            }
        case SELECT_WIDGET_TYPE:
            console.log(action)
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id == action.id) {
                        widget.widgetType = action.widgetType
                    }

                    return true
                })
            }

            console.log(newState)

            return JSON.parse(JSON.stringify(newState))

        case SAVE:
            fetch('http://localhost:8080/api/widget/save',
                {
                    method: 'post',
                    body: JSON.stringify(state.widgets),
                    headers: {
                        'content-type': 'application/json'}
                })

            return state
        case ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length+1, text: 'new widget', widgetType: 'Paragraph'}
                ]
            }
        case DELETE_WIDGET:
            return {
                widgets : state.widgets.filter(widget => (
                    widget.id !==action.id
                ))}
        case FIND_ALL_WIDGETS:
            return  {
                widgets : action.widgets
            }

        default:
            return state
    }
}