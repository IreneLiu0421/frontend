import React, {useState, useEffect} from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js';

import BlockStyleToolbar, {getBlockStyle} from './components/BlockStyles/BlockStyleToolbar'

import {
    FiBold,
    FiItalic,
    FiUnderline,
    FiAlignCenter,
    FiAlignLeft,
    FiAlignRight
  } from 'react-icons/fi'

import './css/Draft.css'
import './css/draftEditor.scss'

import { connect } from 'react-redux'

function DraftEditor(props){

    //initialize editor state
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const toggleBlockType = (blockType)=>[
        setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    ]

    const renderInlineStyles = (e, style) =>{
        e.preventDefault()
        console.log(editorState.getCurrentInlineStyle())
        setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    }


    // basically just sets state...
    const onChange = editorState =>{
        return  setEditorState(editorState);
    };

    const isActive = style =>{
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style)
    }

    const imgHandler = ()=>{
        document.querySelector('input[type="file"]').click();
    }

    function  handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          onChange(newState);
          return 'handled';
        }
        return 'not-handled';
      }
      

    return(
        <>
            <div className="bk-draft-editor-container">
                <div>
                    <div className="bk-draft-toolbar">
                        <button onClick={imgHandler}>Img
                            <input type="file" hidden />
                        </button>
                        <BlockStyleToolbar
                        editorState = {editorState}
                        onToggle = {toggleBlockType}
                         />
                    </div>
                    <Editor
                    placeholder="hello"
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={onChange} //update state on change
                    readOnly={false} //should be true before editing
                    customStyleMap= {styleMap}
                    blockRendererFn={getBlockStyle}
                    />
                </div>
            </div>
            <button className="bk-submit-btn">Submit</button>
        </>
    )
}

//send editor state through props to component
const mapStateToProps = (store)=>{
    return { total: store.counter }
}

export default connect(mapStateToProps)(DraftEditor)