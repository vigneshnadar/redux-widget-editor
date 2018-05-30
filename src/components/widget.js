import {DELETE_WIDGET} from "../constants";
import {connect} from "react-redux";
import React from 'react'
import {headingSizeChanged, headingTextChanged,linkUrlChanged,imageUrlChanged,widgetNameChanged} from "../actions";


const Heading = ({widget, preview, headingTextChanged,headingSizeChanged}) => {

    let selectElem
    let inputElem

    return (
        <div>
            <div hidden={preview}>
            <h1>Heading {widget.size}</h1>
            <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                   value={widget.text}
                   ref={node => inputElem = node}/>
            <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                ref={node => selectElem = node}
            value={widget.size}>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
            <h3>Preview</h3>
            </div>
            {widget.size==1 && <h1>{widget.text}</h1>}
            {widget.size==2 && <h2>{widget.text}</h2>}
            {widget.size==3 && <h3>{widget.text}</h3>}
        </div>

    )
}

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId,newText) => headingTextChanged(dispatch,widgetId,newText),
    headingSizeChanged: (widgetId,newSize) => headingSizeChanged(dispatch,widgetId,newSize),
    imageUrlChanged: (widgetId,newUrl) => imageUrlChanged(dispatch,widgetId,newUrl),
    widgetNameChanged: (widgetId,newName) => widgetNameChanged(dispatch,widgetId,newName),
    linkUrlChanged: (widgetId,newUrl) => linkUrlChanged(dispatch,widgetId,newUrl),
})


const stateToPropsMapper = state => ({
    preview: state.preview
})


const HeadingContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Heading)

const Paragraph = () => (
    <div>
        <h1>Paragraph</h1>
        <textarea></textarea>
    </div>

)

const Link = ({widget, preview, linkUrlChanged,headingTextChanged}) => {

    let linkText
    let inputElem

    return (
        <div>
            <div hidden={preview}>
                <h1>Image widget {widget.imageSrc}</h1>
                <input onChange={() => linkUrlChanged(widget.id, inputElem.value)}
                       value={widget.linkHref} placeholder="Link URL"
                       ref={node => inputElem = node}/>
                <input onChange={() => headingTextChanged(widget.id, linkText.value)}
                       value={widget.text} placeholder="Link text"
                       ref={nod => linkText = nod}/>

                <h3>Preview</h3>
            </div>
            {console.log(widget.linkHref)}
            {console.log(widget.text)}
            {widget.linkHref != null && widget.linkHref != "" && widget.linkHref != "Link URL" && <a href={widget.linkHref}>{widget.text}</a>}
        </div>

    )
}


const LinkContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Link)

const List = () => (
    <h1>List</h1>
)


const Image = ({widget, preview, imageUrlChanged,widgetNameChanged}) => {

    let imageName
    let inputElem

    return (
        <div>
            <div hidden={preview}>
                <h1>Image widget {widget.imageSrc}</h1>
                <input onChange={() => imageUrlChanged(widget.id, inputElem.value)}
                       value={widget.imageSrc} placeholder="Image URL"
                       ref={node => inputElem = node}/>
                <input onChange={() => widgetNameChanged(widget.id, imageName.value)}
                       value={widget.widgetName} placeholder="Widget Name"
                       ref={nod => imageName = nod}/>

                <h3>Preview</h3>
            </div>
            {console.log(widget.imageSrc)}
            {console.log(widget.widgetName)}
            {widget.imageSrc != null && widget.imageSrc != "" && widget.imageSrc != "Image URL" && <img src={widget.imageSrc} alt={widget.widgetName} height="42" width="42"/>}
        </div>

    )
}


const ImageContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Image)


const Widget =({widget,preview, dispatch}) => {

    let selectElement

    return(<li>
        <div hidden={preview}>
        {widget.id} {widget.text}

        <select value={widget.widgetType} onChange={e =>
            dispatch({type: 'SELECT_WIDGET_TYPE',
                id: widget.id,
                widgetType: selectElement.value
            })} ref={node => selectElement = node}>
            <option>Heading</option>
            <option>Paragraph</option>
            <option>List</option>
            <option>Image</option>
            <option>Link</option>
        </select>
        <button onClick={e => (
            dispatch({type: DELETE_WIDGET, id: widget.id})
        )}>Delete
        </button>
        </div>
        <div>
            {widget.widgetType=='Heading' && <HeadingContainer widget={widget}/>}
            {widget.widgetType=='Paragraph' &&<Paragraph />}
            {widget.widgetType=='List' &&<List/>}
            {widget.widgetType=='Image' &&<ImageContainer widget={widget}/>}
            {widget.widgetType=='Link' &&<LinkContainer widget={widget}/>}
        </div>
    </li>)
}

export const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)