import {ADD_WIDGET,MOVE_UP_WIDGET,LINK_URL_CHANGED,LIST_TYPE_CHANGED,PARAGRAPH_TEXT_CHANGED,IMAGE_URL_CHANGED,WIDGET_NAME_CHANGED,HEADING_TEXT_CHANGED,PREVIEW,HEADING_SIZE_CHANGED, FIND_ALL_WIDGETS, SAVE} from "../constants";

// imageUrlChanged: (widgetId,newUrl) => imageUrlChanged(dispatch,widgetId,newUrl),
//     widgetNameChanged: (widgetId,newName) => widgetNameChanged(dispatch,widgetId,newName)




export const linkUrlChanged = (dispatch,widgetId, newUrl) => (
    dispatch({type: LINK_URL_CHANGED,
        id: widgetId,
        linkHref: newUrl})
)


export const imageUrlChanged = (dispatch,widgetId, newUrl) => (
    dispatch({type: IMAGE_URL_CHANGED,
        id: widgetId,
        imageSrc: newUrl})
)


export const widgetNameChanged = (dispatch,widgetId, newName) => (
    dispatch({type: WIDGET_NAME_CHANGED,
        id: widgetId,
        widgetName: newName})
)

export const headingSizeChanged = (dispatch,widgetId, newSize) => (
    dispatch({type: HEADING_SIZE_CHANGED,
    id: widgetId,
    size: newSize})
)



export const listTypeChanged = (dispatch,widgetId, newType) => (
    dispatch({type:  LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType})
)


export const headingTextChanged = (dispatch,widgetId, newText) => (
    dispatch({type: HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)


export const paragraphTextChanged = (dispatch,widgetId, newText) => (
    dispatch({type: PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)


export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => response.json())
        .then(widgets => dispatch({
                type: FIND_ALL_WIDGETS,
                widgets: widgets
            }
        ))
}


export const moveUpWidget = (dispatch,widget) => {
    dispatch({type: MOVE_UP_WIDGET, id: widget.id, widget : widget})
}


export const addWidget = dispatch => {
    dispatch({type : ADD_WIDGET})
}

export const save = dispatch => {
    dispatch({type : SAVE})
}


export const preview = dispatch => {
    dispatch({type : PREVIEW})
}