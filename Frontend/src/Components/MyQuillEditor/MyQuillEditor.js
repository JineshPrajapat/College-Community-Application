import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // You can choose different styles

// Import languages for syntax highlighting
import 'highlight.js/lib/languages/cpp';
import 'highlight.js/lib/languages/c';
import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/python';
import 'highlight.js/lib/languages/java';
import { color } from 'framer-motion';

// Register languages with highlight.js
hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
hljs.registerLanguage('c', require('highlight.js/lib/languages/c'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));

// Configure Quill to use highlight.js for syntax highlighting
const modules = {
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
    ],
    clipboard: {
        matchVisual: false
    },
    history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true
    },
    // imageResize: {
    //     displaySize: true
    // }
};

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'image', 'code-block',
    'color', 'background', 'align'
];

class MyQuillEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '<pre><code>Write your code here</code></pre>' }; // Initial content
    }

    handleChange = (value) => {
        this.setState({ text: value });
        this.props.onDescriptionChange(value); // Pass the updated content to the parent component
    }

    render() {

        const toolbarStyle = {
            backgroundColor: 'white', 
            border: '1px solid #ccc',
            borderBottom: 'none',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            padding: '0',
        };

        return (
            <div style={toolbarStyle}>
            <ReactQuill 
                value={this.state.text}
                onChange={this.handleChange}
                modules={modules}
                formats={formats}
                theme="snow"
            />
            </div>
        );
    }
}

export default MyQuillEditor;
