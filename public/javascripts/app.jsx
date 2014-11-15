var notes = [];
NoteStore = new EventEmitter2();
NoteStore.getAll   = function(){return notes;}
NoteStore.setNotes = function(_notes){
  notes = _notes;
  this.emit('change');
}

function loadViewComponents(){
  var el = document.querySelector('#notePad');
  var notes = NoteStore.getAll();
  React.render(<NotePad notes={notes} />, el);
}

function postNotes(e){
  e.preventDefault();
  var input = document.querySelector('input');
  if(input.value){
    fetch('/api/notes', {
      method: 'put',
      body: new FormData(document.querySelector('form'))
    })
    .then(function(res){return res.json()})
    .then(function(json){
      NoteStore.setNotes(json);
      if(!renderedOnBrowser){
        loadViewComponents();
      }
    });
    input.value = '';
  }
}

document.querySelector('form').addEventListener('submit', postNotes);
