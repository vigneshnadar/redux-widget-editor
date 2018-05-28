import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE} from "../constants";

let idAutoIncrement = 3

export const widgetReducer = (state = {widgets: []}, action) => {
    switch (action.type) {
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
                    {id: idAutoIncrement++, text: 'new widget'}
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