'use strict';

/**
 * @memberof cmp2App
 * @ngdoc controller
 * @name AccountNotesCtrl
 * @description
 * # AccountNotesCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('AccountNotesCtrl', function($scope, $window, Accounts, jxa, mdTemplate) {

  /* global moment */
  /* global EvernoteHelper */
  /* global $ */
  /* global SimpleMDE */

  var ajs = require('apple-java-script');

  $scope.safeApply = function(fn) {
    if (this.$root) {
      var phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    }

  };

  /*****************/
  /* Editor and Md */
  /*****************/

  var MarkdownIt = require('markdown-it')()
    .use(require('markdown-it-checkbox'))
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-highlightjs'))
    .use(require('markdown-it-contents'), {
      className: 'table-of-contents'
    });

  var markdown = function(md) {
    return MarkdownIt.render(md);
  };

  var simplemde = null;

  /**
   * Setup the editor
   * @memberof AccountNotesCtrl
   * @function loadEditor
   */
  function loadEditor() {
    if ($("#editor").length) {
      simplemde = new SimpleMDE({
        element: $("#editor")[0]
      });
      if ($(".editor-toolbar").length !== 1) {
        setTimeout(function() {
          loadEditor();
        }, 100);
      }
    } else {
      setTimeout(function() {
        loadEditor();
      }, 100);
    }
  }

  loadEditor();

  /************/
  /* Autosave */
  /************/

  $scope.changed = false;
  $scope.autosave = true;
  $scope.lastSaved = moment();
  var saving = false;

  /**
   * Update markdown file with new data
   * @memberof AccountNotesCtrl
   * @function save
   * @param  {String} data New md value
   */
  function save() {
    saving = true;
    var loop = setInterval(function() {
      if ($scope.changed) {
        var data = simplemde.value();
        // Update HTML
        ajs($scope.note, EvernoteHelper.prepareHtml(markdown(data)), jxa.updateHtml);
        $scope.$apply(function() {
          $scope.lastSaved = moment();
          $scope.changed = false;
        });
      }
      if (!$scope.autosave) {
        saving = false;
        clearInterval(loop);
        return;
      }
    }, 2000); // TODO : make interval configurable
  }

  simplemde.codemirror.on("change", function() {
    $scope.safeApply(function() {
      $scope.changed = true;
    });
  });

  /**
   * Change autosave mode
   * @memberof AccountNotesCtrl
   * @function $scope.changeAutosave
   */
  $scope.changeAutosave = function() {
    $scope.autosave = !$scope.autosave;
    if ($scope.autosave && !saving && $scope.note) {
      save();
    }
  };

  $scope.templates = [];


  /**
   * Initialize note environnement
   * @memberof AccountNotesCtrl
   * @function init
   */
  function init() {
    if ($scope.account) {
      var notebook = $scope.account.Name;
      if (notebook && ajs(notebook, jxa.notebookExists)) {
        $scope.safeApply(function() {
          $scope.noteList = ajs(notebook, jxa.getNoteList);
        });
      } else if (notebook) {
        ajs(notebook, jxa.createNotebook);
        $scope.safeApply(function() {
          $scope.noteList = ajs(notebook, jxa.getNoteList);
        });
      }
    }
  }

  /**
   * Format dates to readable dates
   * @memberof AccountNotesCtrl
   * @function formatDate
   * @param  {String} date
   * @return {Moment}      Formated date
   */
  $scope.formatDate = function(date) {
    return moment(date, 'ddd MMM DD YYYY HH:mm:ss');
  };

  /**
   * Load selected note
   * @memberof AccountNotesCtrl
   * @function loadNote
   * @param  {Object} note Note to load
   */
  $scope.loadNote = function(note) {
    $scope.note = note;
    var md = EvernoteHelper.toMarkdown(ajs(note, jxa.getHtml));
    simplemde.value(md);
    $scope.note = note;
    $scope.lastSaved = moment();
    $scope.changed = false;
    if ($scope.autosave && !saving) {
      save();
    }
  };

  /**
   * Open Dialog to create local file for the editor
   * @memberof AccountNotesCtrl
   * @function createNote
   */
  $scope.createNote = function(newNote) {

    var md = "## Table of Content\r\r{!toc}\r\r# Title 1";

    if (newNote.md) {
      md = $scope.templates.filter(function(t) {
        return t._id === newNote.md;
      })[0].md;
    }
    if (simplemde.value() !== "" && !$scope.note) {
      md = simplemde.value();
    }
    simplemde.value(md);
    var html = EvernoteHelper.prepareHtml(markdown(md));
    $scope.note = ajs(newNote.title, $scope.account.Name, html, jxa.createNoteWithHtml);
    $scope.noteList.push($scope.note);

    $scope.newNote = null;

    if ($scope.autosave && !saving) {
      save();
    }
  };

  /**
   * Trigger save function
   * @memberof AccountNotesCtrl
   * @function $scope.save
   */
  $scope.save = function() {
    save();
  };

  /**
   * Delete a note
   * @memberof AccountNotesCtrl
   * @function deleteNote
   * @param  {Object} note Note to delete
   */
  $scope.deleteNote = function(note) {
    if (note) {
      var r = $window.confirm("Please confirm deletion of note " + note.title);
      if (r) {
        $scope.note = null;
        ajs(note, jxa.deleteNote);
        $scope.noteList = ajs(note.notebook, jxa.getNoteList);
        simplemde.value("");
        $scope.changed = false;
      }
    }
  };

  Accounts.registerObserverCallback(init);

  mdTemplate.getAll().then(function(templates) {
    $scope.templates = templates;
  }, function(err) {
    console.log(err);
  });

});
