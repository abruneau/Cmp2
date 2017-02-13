'use strict';

/**
 * @ngdoc function
 * @name cmp2App.controller:TemplatesCtrl
 * @description
 * # TemplatesCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('TemplatesCtrl', function(mdTemplate, $scope, $window) {

  /* global moment */
  /* global $ */
  /* global SimpleMDE */

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

  var simplemde = null;

  /**
   * Setup the editor
   * @memberof TemplatesCtrl
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
   * @memberof TemplatesCtrl
   * @function save
   * @param  {String} data New md value
   */
  function save() {
    saving = true;
    var loop = setInterval(function() {
      if ($scope.changed) {
        var data = simplemde.value();
        // Update HTML
        $scope.template.md = data;
        $scope.template.lastUpdate = moment();
        $scope.template.update().then(function() {
          $scope.$apply(function() {
            $scope.lastSaved = moment();
            $scope.changed = false;
          });
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

  ////////////
  // Scope  //
  ////////////

  /**
   * Change autosave mode
   * @memberof TemplatesCtrl
   * @function $scope.changeAutosave
   */
  $scope.changeAutosave = function() {
    $scope.autosave = !$scope.autosave;
    if ($scope.autosave && !saving && $scope.note) {
      save();
    }
  };

  $scope.templates = [];
  $scope.template = null;

  mdTemplate.getAll().then(function(templates) {
    $scope.$apply(function() {
      $scope.templates = templates;
    });
  }, function(err) {
    console.log(err);
  });

  /**
   * Format dates to readable dates
   * @memberof TemplatesCtrl
   * @function formatDate
   * @param  {String} date
   * @return {Moment}      Formated date
   */
  $scope.formatDate = function(date) {
    return moment(date);
  };

  /**
   * Open Dialog to create local file for the editor
   * @memberof TemplatesCtrl
   * @function createNote
   * @param {String} newTemplate New template name
   */
  $scope.createTemplate = function(newTemplate) {
    if (newTemplate === undefined) {
      console.log("You didn't save the file");
      return;
    }
    var md = "## Table of Content\r\r{!toc}\r\r# Title 1";
    if (simplemde.value() !== "" && !$scope.template) {
      md = simplemde.value();
    }
    simplemde.value(md);
    new mdTemplate({
      md: md,
      title: newTemplate,
      lastUpdate: moment()
    }).insert().then(function(template) {
      $scope.template = template;
      $scope.templates.push(template);
    });

    $scope.newTemplate = null;

    if ($scope.autosave && !saving) {
      save();
    }
  };

  /**
   * Load a template in the editor
   * @memberof TemplatesCtrl
   * @function $scope.loadTemplate
   * @param  {Template} template Selected template
   */
  $scope.loadTemplate = function(template) {
    $scope.template = template;
    simplemde.value(template.md);
    $scope.lastSaved = moment();
    $scope.changed = false;
    if ($scope.autosave && !saving) {
      save();
    }
  };

  /**
   * Delete selected Template
   * @memberof TemplatesCtrl
   * @function $scope.deleteTemplate
   * @param  {Template} template Template to be deleted
   */
  $scope.deleteTemplate = function(template) {
    if (template) {
      var r = $window.confirm("Please confirm deletion of template " + template.title);
      if (r) {
        $scope.template = null;
        template.delete().catch(function(err) {
          console.log(err);
        });
        var index = $scope.templates.indexOf(template);
        $scope.templates.splice(index, 1);
        simplemde.value("");
        $scope.changed = false;
      }
    }
  };

  /**
   * Trigger save function
   * @memberof TemplatesCtrl
   * @function $scope.save
   */
  $scope.save = function() {
    save();
  };

});
