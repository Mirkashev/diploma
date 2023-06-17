import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// todo: need to write script to add this to node_modules 'yarn add file:./customCkEditor'
import CustomEditor from "../../../../customCkEditor/build/ckeditor";
import MyCustomUploadAdapterPlugin from "@/utils/ckUploadAdapter";
import Timestamp from "./customPlugins/sendButton";

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

export default function CKeditor({ onChange, editorLoaded, name, value }: any) {
  // const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>();

  // useEffect(() => {
  //   // editorRef.current = {
  //   //   CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
  //   //   ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
  //   // };
  //   // console.log(CustomEditor.plugins);
  //   // CustomEditor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {
  //   //   return new MyUploadAdapter( loader );
  //   // };
  //   // console.log(new CustomEditor());
  // }, []);

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
                // 'timestamp',
                "blockQuote",
                "bold",
                // 'imageUpload',
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
                // 'imageInsert'
              ],
            },
            extraPlugins: [MyCustomUploadAdapterPlugin],
            // plugins:[
            //   Timestamp,
            // ],
            simpleUpload: {
              // The URL that the images are uploaded to.
              uploadUrl: "http://google.com",

              // Enable the XMLHttpRequest.withCredentials property.
              withCredentials: true,

              // Headers sent along with the XMLHttpRequest to the upload server.
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
