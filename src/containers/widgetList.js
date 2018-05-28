import {ADD_WIDGET} from "../constants";
import {Component} from "react";
import {addWidget, findAllWidgets, save} from "../actions";
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
                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget} key={widget.id}/>
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
        widgets : state.widgets
    }
)


const dispatchToPropsMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch)
})

export const App = connect(stateToPropertiesMapper, dispatchToPropsMapper)(WidgetList)