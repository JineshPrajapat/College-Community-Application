import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './MyCKEditor.scss';

class MyCKeditor extends Component {
    render() {
        return (
            // <div className="App">
            <CKEditor
                editor={ClassicEditor}
                data="<p>Write your contribution here</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    this.props.onDescriptionChange(data);
                  }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
                style={{ height: '300px' }}
            />
            // </div>
        );
    }
}

export default MyCKeditor;
