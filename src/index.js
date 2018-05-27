import React from 'react'
import ReactDOM from 'react-dom'


let initialState ={
    widgets: [
        {id: 0, text: 'Widget 1'},
        {id: 0, text: 'Widget 2'},
        {id: 0, text: 'Widget 3'}
    ]
}

ReactDOM.render(
    <h1>Widget List Editor</h1>,
    document.getElementById('root')
)