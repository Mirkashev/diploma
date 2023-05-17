import { ButtonView } from '@ckeditor/ckeditor5-ui';

export default class Timestamp extends Plugin {
    private editor: any;
    init() {
        const editor = this.editor;
        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'timestamp', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set( {
                label: 'Timestamp',
                withText: true
            } );

            return button;
        } );
    }
    destroy(){
      return;
    }
}