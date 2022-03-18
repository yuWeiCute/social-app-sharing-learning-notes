/* import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

export default function DraftEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Write something!"
      />
    </div>
  );
} */

/* import React , {useState} from "react";

import fb from "./firebase";
const DB =fb.firestore()
const Blogslist = DB.collection('blogs');

const DraftEditor = () => {

    const[title, SetTitle] = useState("");
    const[body, SetBody] = useState("");

    const submit =(e)=> {
        e.preventDefault();
        Blogslist.add ({
            Title: title,
            Body: body
        }).then((docRef)=> {
            alert("data successfully submit")
        }).catch((error) => {
            console.error("error:", error);
        });
    }
    return(
        <div>
            <form onSubmit={(event) => {submit(event)}}>    
            <input type="text" placeholder="Title" 
            onChange={(e)=>{SetTitle(e.target.value)}} required />

            <textarea  name="content" type="text" placeholder="write your content here" 
            rows="10" cols="150" onChange={(e)=>{SetBody(e.target.value)}} required >
            </textarea>

            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default DraftEditor; */

import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const DraftEditor = () => {
  const [value, setValue] = useState("")

  const handleOnchange = (event, editor) => {
    console.log(editor.getData())
    const data = editor.getData()
    setValue(data)
  }
  return (
    <div>
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        /*         data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }} */
        onChange={handleOnchange}
      />
    </div>

  )
}

export default DraftEditor