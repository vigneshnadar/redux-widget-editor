import {DELETE_WIDGET} from "../constants";
import {connect} from "react-redux";
import React from 'react'


const Widget =({widget, dispatch}) => {

    let selectElement

    return(<li>{widget.id} {widget.text}

        <select onChange={e =>
            dispatch({type: 'SELECT_WIDGET_TYPE',
                id: widget.id,
                widgetType: selectElement.value
            })} ref={node => selectElement = node}>
            <option>Heading</option>
            <option>Paragraph</option>
            <option>List</option>
            <option>Image</option>
        </select>
        <button onClick={e => (
            dispatch({type: DELETE_WIDGET, id: widget.id})
        )}>Delete
        </button>
    </li>)
}

export const WidgetContainer = connect()(Widget)