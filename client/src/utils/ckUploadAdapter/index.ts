class MyUploadAdapter {
  private readonly loader: any;
  constructor( loader:any ) {
      // The file loader instance to use during the upload.
      this.loader = loader;
  }

  // Starts the upload process.
  upload() {
      // Update the loader's progress.
      return this.loader.file.then((file:any) => new Promise((resolve, reject) => {
        console.log(file);
        this.loader.uploaded = true;
        resolve( {
            default: 'https://i.pinimg.com/originals/8a/a7/83/8aa7831e22f8d5c74aecfe0c0e6953e3.jpg'
        })

    }));
  }

  // Aborts the upload process.
  abort() {
      // Reject the promise returned from the upload() method.
  }
}

export default function MyCustomUploadAdapterPlugin( editor:any ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {
      // Configure the URL to the upload script in your back-end here!
      return new MyUploadAdapter( loader );
  };
}