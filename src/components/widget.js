import {DELETE_WIDGET} from "../constants";
import {connect} from "react-redux";
import React from 'react'



const Heading = () => (
    <div>
        <h1>Heading</h1>
        <select>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
        </select>
    </div>

)

const Paragraph = () => (
    <div>
        <h1>Paragraph</h1>
        <textarea></textarea>
    </div>

)

const Image = () => (
    <h1>Image</h1>
)

const List = () => (
    <h1>List</h1>
)


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
        <div>
            {widget.widgetType=='Heading' && <Heading/>}
            {widget.widgetType=='Paragraph' &&<Paragraph/>}
            {widget.widgetType=='List' &&<List/>}
            {widget.widgetType=='Image' &&<Image/>}
        </div>
    </li>)
}

export const WidgetContainer = connect()(Widget)