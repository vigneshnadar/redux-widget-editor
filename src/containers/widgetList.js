import {ADD_WIDGET} from "../constants";
import {Component} from "react";
import {addWidget, findAllWidgets, save,preview} from "../actions";
import {connect} from "react-redux";
import React from 'react';
import {WidgetContainer} from "../components/widget";

class WidgetList extends Component {
    // ({widgets, dispatch})


    constructor(props){
        super(props)
        this.props.findAllWidgets()
    }

    render() {
        return (
            <div>
                <h1>Widget List: ({this.props.widgets.length})</h1>
                <button hidden={this.props.previewMode} onClick={this.props.save}>Save</button>
                <button onClick={this.props.preview}>Preview</button>
                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer preview={this.props.previewMode} widget={widget} key={widget.id}/>
                    ))}
                </ul>
                <button onClick={e => (
                    this.props.addWidget()
                )}>Add Widget
                </button>
            </div>
        )
    }
}


const stateToPropertiesMapper = (state) => (
    {
        widgets : state.widgets,
        previewMode: state.preview
    }
)


const dispatchToPropsMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch),
    preview: () => preview(dispatch)
})

export const App = connect(stateToPropertiesMapper, dispatchToPropsMapper)(WidgetList)