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
    // console.log(convertToRaw(editorState.getCurrentContent()))
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setRichtext(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    // convertToRaw 方法，用于把 immutable 的 ContentState 对象转为 plain JavaScript 对象，从而拥有作为 JSON 格式存储的能力，
    //对应地，convertFromRaw 方法能将转化后的对象转回 ContentState 对象。
    //

  }, [editorState, setRichtext]);

  return (
    <div className=" w-full bg-white pl-3 pr-3 pb-3 lg:pl-5 lg:pr-5 lg:pb-5" >

      <div className="border border-gray-300 p-2"
        style={{ minHeight: '280px' }}>
        <Editor
          placeholder={'Write what you would say.'}
          editorState={editorState}
          // currentContent 是一个 ContentState 对象，存放的是当前编辑器中的内容，称为内容描述对象
          // selection 是一个 SelectionState 对象，它是当前选中状态的描述对象
          // redoStack 和 undoStack 就是撤销/重做栈，它是一个数组，存放的是 ContentState 类型的编辑器状态
          // onEditorStateChange={setEditorState}
          // wrapperClassName="包装类"
          // editorClassName="编辑器类"
          // toolbarClassName="工具栏类"
          // wrapperStyle={<wrapperStyleObject>}
          // editorStyle={<editorStyleObject>}

        // 纯 React 意味着函数式，而富文本的渲染适合在本质上被理解为函数。
        // 如果使用 Draft.js，富文本的状态被封装到一个 EditorState 类型的 immutable 对象中，
        // 这个对象作为组件属性（函数参数）输入给 Editor 组件（函数）。一旦用户进行操作，比如敲一个回车，
        // Editor 组件的 onChange 事件触发，onChange 函数返回一个全新的 EditorState 实例，
        // Editor 接收这个新的输入，渲染新的内容。一切都是声明式的，看上去就像传统的 input 组件：
        />

      </div>

    </div>
  );
}