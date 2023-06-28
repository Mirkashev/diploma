import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// todo: need to write script to add this to node_modules 'yarn add file:./customCkEditor'
import CustomEditor from "../../../../customCkEditor/build/ckeditor";
import MyCustomUploadAdapterPlugin from "@/utils/ckUploadAdapter";

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

export default function CKeditor({ onChange, editorLoaded, name, value }: any) {
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={CustomEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            toolbar: {
              items: [
                "blockQuote",
                "bold",
                "link",
                "heading",
                "indent",
                "outdent",
                "italic",
                "numberedList",
                "bulletedList",
                "insertTable",
                "redo",
                "undo",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
              ],
            },
            extraPlugins: [MyCustomUploadAdapterPlugin],
            simpleUpload: {
              uploadUrl: "http://google.com",
              withCredentials: true,
              headers: {
                "X-CSRF-TOKEN": "CSRF-Token",
                Authorization: "Bearer <JSON Web Token>",
              },
            },
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}
