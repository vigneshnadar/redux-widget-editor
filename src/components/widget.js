import {DELETE_WIDGET} from "../constants";
import {connect} from "react-redux";
import React from 'react'
import {headingSizeChanged} from "../actions";


const Heading = ({widget, headingSizeChanged}) => {

    let selectElem

    return (
        <div>
            <h1>Heading {widget.size}</h1>
            <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                ref={node => selectElem = node}>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
        </div>

    )
}

const dispatchToPropsMapper = dispatch => ({
    headingSizeChanged: (widgetId,newSize) => headingSizeChanged(dispatch,widgetId,newSize)
})



const HeadingContainer = connect(null,dispatchToPropsMapper)(Heading)

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

        <select value={widget.widgetType} onChange={e =>
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
            {widget.widgetType=='Heading' && <HeadingContainer widget={widget}/>}
            {widget.widgetType=='Paragraph' &&<Paragraph />}
            {widget.widgetType=='List' &&<List/>}
            {widget.widgetType=='Image' &&<Image/>}
        </div>
    </li>)
}

export const WidgetContainer = connect()(Widget)