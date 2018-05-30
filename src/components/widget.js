import {DELETE_WIDGET,MOVE_UP_WIDGET,MOVE_DOWN_WIDGET} from "../constants";
import {connect} from "react-redux";
import React from 'react'
import {headingSizeChanged, moveUpWidget,headingTextChanged,listTypeChanged,paragraphTextChanged,linkUrlChanged,imageUrlChanged,widgetNameChanged} from "../actions";


const Heading = ({widget, preview, headingTextChanged,headingSizeChanged}) => {

    let selectElem
    let inputElem

    return (
        <div>
            <div hidden={preview}>
            {/*<h1>Heading Widget</h1>*/}
                <br/>
            <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                   value={widget.text}
                   ref={node => inputElem = node}/>
                <br/>
            <select className="form-control" onChange={() => headingSizeChanged(widget.id, selectElem.value)}
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


const List = ({widget, preview, headingTextChanged,listTypeChanged,widgetNameChanged}) => {

    let selectElem
    let inputElem
    let widgetName

    return (
        <div>
            <div hidden={preview}>
                {/*<h1>List Widget</h1>*/}
                <br/>
                <textarea className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node} placeholder="Enter one list item per line"/>
                <br/>
                <select className="form-control" onChange={() => listTypeChanged(widget.id, selectElem.value)}
                        ref={node => selectElem = node}
                        value={widget.listType} defaultValue="Unordered">
                    <option value="Ordered">Ordered List</option>
                    <option value="Unordered">Unordered List</option>
                </select>
                <br/>
                <input onChange={() => widgetNameChanged(widget.id, widgetName.value)}
                       value={widget.widgetName} placeholder="Widget Name"
                       ref={nod => widgetName = nod}/>
                <br/>
                <h3>Preview</h3>
            </div>
            {widget.listType=='Ordered' && <ol>{ widget.text.split("\n").map(eachLine => (
                <li key={eachLine}>{eachLine}</li>
            ))}</ol>}
            {widget.listType=='Unordered' && <ul>{ widget.text.split("\n").map(eachLine => (
                <li key={eachLine}>{eachLine}</li>
            ))}</ul>}
        </div>

    )
}



const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId,newText) => headingTextChanged(dispatch,widgetId,newText),
    headingSizeChanged: (widgetId,newSize) => headingSizeChanged(dispatch,widgetId,newSize),
    imageUrlChanged: (widgetId,newUrl) => imageUrlChanged(dispatch,widgetId,newUrl),
    widgetNameChanged: (widgetId,newName) => widgetNameChanged(dispatch,widgetId,newName),
    linkUrlChanged: (widgetId,newUrl) => linkUrlChanged(dispatch,widgetId,newUrl),
    paragraphTextChanged: (widgetId,newText) => paragraphTextChanged(dispatch,widgetId,newText),
    listTypeChanged: (widgetId,newType) => listTypeChanged(dispatch,widgetId,newType),
    moveUpWidget: (widgetId) => moveUpWidget(dispatch,widgetId),
})


const stateToPropsMapper = state => ({
    preview: state.preview
})


const ListContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(List)
const HeadingContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Heading)



const Link = ({widget, preview, linkUrlChanged,headingTextChanged}) => {

    let linkText
    let inputElem

    return (
        <div>
            <div hidden={preview}>
                {/*<h1>Link widget</h1>*/}
                <br/>
                <input className="form-control" onChange={() => linkUrlChanged(widget.id, inputElem.value)}
                       value={widget.linkHref} placeholder="Link URL"
                       ref={node => inputElem = node}/>
                <br/>
                <input className="form-control" onChange={() => headingTextChanged(widget.id, linkText.value)}
                       value={widget.text} placeholder="Link text"
                       ref={nod => linkText = nod}/>
                <br/>

                <h3>Preview</h3>
            </div>
            {console.log(widget.linkHref)}
            {console.log(widget.text)}
            {widget.linkHref != null && widget.linkHref != "" && widget.linkHref != "Link URL" && <a href={widget.linkHref}>{widget.text}</a>}
        </div>

    )
}


const LinkContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Link)




const Paragraph = ({widget, preview, paragraphTextChanged,widgetNameChanged}) => {

    let paraText
    let inputElem

    return (
        <div>
            <div hidden={preview}>
                {/*<h1>Paragraph widget</h1>*/}
                <br/>
                <textarea className="form-control" onChange={() => paragraphTextChanged(widget.id, paraText.value)}
                       value={widget.text} placeholder="Paragraph Text"
                       ref={node => paraText = node}/>
                <br/>
                <input className="form-control" onChange={() => widgetNameChanged(widget.id, inputElem.value)}
                       value={widget.widgetName} placeholder="Widget Name"
                       ref={nod => inputElem = nod}/>
                <br/>
                <h3>Preview</h3>
            </div>
            {console.log(widget.text)}
            {console.log(widget.widgetName)}
            {widget.text != null && widget.text != "" && widget.text != "Paragraph Text" && <p>{widget.text}</p>}
        </div>

    )
}


const ParagraphContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Paragraph)


const Image = ({widget, preview, imageUrlChanged,widgetNameChanged}) => {

    let imageName
    let inputElem

    return (
        <div>
            <div hidden={preview}>
                {/*<h1>Image widget</h1>*/}
                <br/>
                <input className="form-control" onChange={() => imageUrlChanged(widget.id, inputElem.value)}
                       value={widget.imageSrc} placeholder="Image URL"
                       ref={node => inputElem = node}/>
                <br/>
                <input className="form-control" onChange={() => widgetNameChanged(widget.id, imageName.value)}
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

    return(<li className="list-group-item">
        <div hidden={preview}>
        {/*{widget.id} {widget.text}*/}
<div className="form-inline">
            {widget.widgetType=='Heading' && <h3>Heading Widget</h3>}
            {widget.widgetType=='Paragraph' && <h3>Paragraph Widget</h3>}
            {widget.widgetType=='List' && <h3>List Widget</h3>}
            {widget.widgetType=='Image' && <h3>Image Widget</h3>}
            {widget.widgetType=='Link' && <h3>Link Widget</h3>}
    &nbsp;&nbsp;
            <div >
          <button className="btn btn-warning" onClick={e => (
                dispatch({type: MOVE_UP_WIDGET, id: widget.id, widget : widget})
            )}>UP
            </button>
            &nbsp;
            <button className="btn btn-warning" onClick={e => (
                dispatch({type: MOVE_DOWN_WIDGET, id: widget.id, widget : widget})
            )}>Down
            </button>
    &nbsp;

        <select className="form-control" value={widget.widgetType} onChange={e =>
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
    &nbsp;
        <button className="btn btn-danger" onClick={e => (
            dispatch({type: DELETE_WIDGET, id: widget.id})
        )}>x
        </button>
            </div>
</div>
        </div>
        <div>
            {widget.widgetType=='Heading' && <HeadingContainer widget={widget}/>}
            {widget.widgetType=='Paragraph' &&<ParagraphContainer widget={widget}/>}
            {widget.widgetType=='List' &&<ListContainer widget={widget}/>}
            {widget.widgetType=='Image' &&<ImageContainer widget={widget}/>}
            {widget.widgetType=='Link' &&<LinkContainer widget={widget}/>}
        </div>
    </li>)
}

export const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)