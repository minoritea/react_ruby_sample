var renderedOnBrowser = false;

NotePad = React.createClass({
  componentDidMount: function() {
    renderedOnBrowser = false;
    var self = this;
    if('undefined' !== typeof NoteStore)
      NoteStore.on('change', function(){
        self.setProps({notes: NoteStore.getAll()});
      });
  },
  render: function(){
		return <ol>{
			  this.props.notes.map(function(note){
          return <li>{note}</li>;
				})
			}</ol>
    ;
  }
});
