import {DELETE_WIDGET} from "../constants";
import {connect} from "react-redux";
import React from 'react'


const Widget =({widget, dispatch}) => (
    <li >{widget.id}  {widget.text}
        <button onClick={e => (
            dispatch({type : DELETE_WIDGET, id: widget.id})
        )}>Delete</button></li>
)

export const WidgetContainer = connect()(Widget)