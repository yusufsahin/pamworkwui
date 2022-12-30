import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  'align',
  'color', 'background'
];
const ReactQuillToolBar = (field) => {
  return (
    <ReactQuill
    name="RQToolbar"
      value={field.value}
      onChange={(text) => {
        field.onChange(text);
      }}
      modules={modules}
      formats={formats}
    />
  );
};

export default ReactQuillToolBar;
