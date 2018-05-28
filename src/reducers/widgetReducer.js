import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE} from "../constants";

let idAutoIncrement = 3

export const widgetReducer = (state = {widgets: []}, action) => {
    switch (action.type) {
        case 'SELECT_WIDGET_TYPE':
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
                    {id: idAutoIncrement++, text: 'new widget', widgetType: 'Paragraph'}
                ]
            }
        case DELETE_WIDGET:
            return {
                widgets : state.widgets.filter(widget => (
                    widget.id !==action.id
                ))}
        case FIND_ALL_WIDGETS:
            return {
                widgets : action.widgets
            }

        default:
            return state
    }
}