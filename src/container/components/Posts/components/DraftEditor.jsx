import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import draftToHtml from "draftjs-to-html";


export default function App({ richtext, setRichtext }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {

    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setRichtext(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }, [editorState]);

  return (
    <div className=" w-full bg-white pl-3 pr-3 pb-3 lg:pl-5 lg:pr-5 lg:pb-5" >
  
      <div className="border border-gray-300 p-2"
          style={{ minHeight: '280px' }}>
         <Editor 
          placeholder={'Write what you would say.'}
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
       
    </div>
  );
}