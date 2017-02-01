'use strict';

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name jxa
 * @description
 * # jxa
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('jxa', function() {
  var self = this;

  /* global Application */

  //////////////
  // Notebook //
  //////////////

  /**
   * Check if a notebook exists
   * @param  {String} name
   * @return {Boolean}
   */
  self.notebookExists = function(name) {
    var Evernote = Application('Evernote');

    var notebooks = Evernote.notebooks();

    for (var i = 0; i < notebooks.length; i++) {
      if (notebooks[i].name() === name) {
        return true;
      }
    }
    return false;
  };

  /**
   * Create a notebook
   * @param  {String} name
   * @return {String}      command to execute
   */
  self.createNotebook = function(name) {
	var Evernote = Application('Evernote');
	Evernote.createNotebook(name.replace(/'/g, "\\'"));
  };

  self.getNoteList = function(notebook) {
    var Evernote = Application('Evernote');
    var matches = Evernote.findNotes('notebook:"' + notebook + '"');
    var result = [];
    for (var i = 0; i < matches.length; i++) {
      var out = {
        noteLink: matches[i].noteLink(),
        title: matches[i].title(),
        creationDate: matches[i].creationDate().toString(),
        notebook: matches[i].notebook().name()
      };
      result.push(out);
    }
    return result;
  };

  //////////
  // Note //
  //////////

  self.getHtml = function(note) {
    var Evernote = Application('Evernote');
    var matche;
    if (note.noteLink) {
      matche = Evernote.findNote(note.noteLink);
    } else {
      var queryString = "";
      if (note.title) {
        queryString += "intitle:\"" + note.title + "\"";
      }
      if (note.notebook) {
        queryString += " notebook:\"" + note.notebook + "\"";
      }
      var matches = Evernote.findNotes(queryString.replace(/'/g, "\\'"));
      if (matches) {
        matche = matches[0];
      } else {
        return 'Note not find';
      }
    }
    return matche.htmlContent();
  };

  self.updateHtml = function(note, newHtml) {
    var Evernote = Application('Evernote');
    var matche;
    if (note.noteLink) {
      matche = Evernote.findNote(note.noteLink);
    } else {
      var queryString = "";
      if (note.title) {
        queryString += "intitle:\"" + note.title + "\"";
      }
      if (note.notebook) {
        queryString += " notebook:\"" + note.notebook + "\"";
      }
      var matches = Evernote.findNotes(queryString.replace(/'/g, "\\'"));
      if (matches) {
        matche = matches[0];
      } else {
        return 'Note not find';
      }
    }
    var html = newHtml.toString().replace(/\r?\n|\r/g, '').replace(/\"/g, '&quot;');
    matche.htmlContent = html;
  };

  self.createNoteWithHtml = function(title, notebook, html) {
    var Evernote = Application('Evernote');
    var note = Evernote.createNote({
      withHtml: html,
      title: title,
      notebook: notebook
    });
    return {
      noteLink: note.noteLink(),
      title: note.title(),
      creationDate: note.creationDate().toString(),
      notebook: note.notebook().name()
    };
  };

  self.deleteNote = function(note) {

	var Evernote = Application('Evernote');
	var matche;
    if (note.noteLink) {
      matche = Evernote.findNote(note.noteLink);
    } else {
      var queryString = "";
      if (note.title) {
        queryString += "intitle:\"" + note.title + "\"";
      }
      if (note.notebook) {
        queryString += " notebook:\"" + note.notebook + "\"";
      }
      var matches = Evernote.findNotes(queryString.replace(/'/g, "\\'"));
      if (matches) {
        matche = matches[0];
      } else {
        return 'Note not find';
      }
    }

	matche.delete();
  };

  return self;
});
