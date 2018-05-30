import {
    ADD_WIDGET,
    LINK_URL_CHANGED,
    LIST_TYPE_CHANGED,
    PARAGRAPH_TEXT_CHANGED,
    PREVIEW,
    WIDGET_NAME_CHANGED,
    IMAGE_URL_CHANGED,
    SELECT_WIDGET_TYPE,
    HEADING_TEXT_CHANGED,
    HEADING_SIZE_CHANGED,
    DELETE_WIDGET,
    FIND_ALL_WIDGETS,
    SAVE,
    MOVE_UP_WIDGET,
    MOVE_DOWN_WIDGET
} from "../constants";

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



        case PARAGRAPH_TEXT_CHANGED:
            // alert("hello")
            return {
                widgets : state.widgets.map((widget) => {
                    if(widget.id === action.id){
                        widget.text = action.text
                    }
                    return Object.assign({},widget)
                })
            }
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


        case LIST_TYPE_CHANGED:
            // alert("hello")
            return {
                widgets : state.widgets.map((widget) => {
                    if(widget.id === action.id){
                        widget.listType = action.listType
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

            let currentOrder = 1
            if(state.widgets.length > 0){
                currentOrder = state.widgets[state.widgets.length-1].widgetOrder +1
            }

            // return {
            let newWidget = {widgets: [
                    ...state.widgets,
                    {id: state.widgets.length+1, text: '', widgetType: 'Paragraph',listType: 'Unordered',widgetOrder: currentOrder}
                ]
             }

            return  {
                widgets : newWidget.widgets.sort((a,b) => a.widgetOrder - b.widgetOrder)
            }
        case DELETE_WIDGET:
            return {
                widgets : state.widgets.filter(widget => (
                    widget.id !==action.id
                ))}
        case MOVE_UP_WIDGET:
                let prevIndex=null
                let currentIndex

                for(let i=0;i < state.widgets.length;i++){
                    if(state.widgets[i].id == action.id){
                        currentIndex=i
                        break;
                    }
                    prevIndex = i
                }
                if(prevIndex !== null){
                    let tempOrder = state.widgets[prevIndex].widgetOrder
                    state.widgets[prevIndex].widgetOrder = state.widgets[currentIndex].widgetOrder
                    state.widgets[currentIndex].widgetOrder = tempOrder
                }



            let sortedUpWidget =  {
                widgets : state.widgets.sort((a,b) => a.widgetOrder - b.widgetOrder)
            }

            return {
                widgets : sortedUpWidget.widgets.map((widget) => {
                    return Object.assign({},widget)
                })
            }



        case MOVE_DOWN_WIDGET:
            let prevDownIndex = null
            let currentDownIndex

            for(let i=state.widgets.length-1;i >=0;i--){
                if(state.widgets[i].id == action.id){
                    currentDownIndex=i
                    break;
                }
                prevDownIndex = i
            }
            if(prevDownIndex !== null){
                let tempDownOrder = state.widgets[prevDownIndex].widgetOrder
                state.widgets[prevDownIndex].widgetOrder = state.widgets[currentDownIndex].widgetOrder
                state.widgets[currentDownIndex].widgetOrder = tempDownOrder
            }


            let sortedWidget =  {
                widgets : state.widgets.sort((a,b) => a.widgetOrder - b.widgetOrder)
            }

            return {
                widgets : sortedWidget.widgets.map((widget) => {
                    return Object.assign({},widget)
                })
            }


        case FIND_ALL_WIDGETS:
            return  {
                widgets : action.widgets.sort((a,b) => a.widgetOrder - b.widgetOrder)
            }

        default:
            return state
    }
}