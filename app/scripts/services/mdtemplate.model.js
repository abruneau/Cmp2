'use strict';

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name mdTemplate
 * @description
 * # mdTemplate
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('mdTemplate', function(database) {

  var Template = function(template) {
    if (template._id) {
      this._id = template._id;
    }
    this.attributes = {
      type: 'mdTemplate'
    };
    this.title = template.title;
    this.md = template.md;
	this.lastUpdate = template.lastUpdate;
  };

  Template.prototype.insert = function() {
    var self = this;
    return database.insertAsync(this).then(function(newDoc) {
      self._id = newDoc._id;
      return new Template(newDoc);
    });
  };

  Template.prototype.update = function() {
    return database.updateAsync({
      _id: this._id
    }, this, {});
  };

  Template.prototype.delete = function() {
    return database.removeAsync({
      _id: this._id
    }, {});
  };

  Template.getAll = function() {
    var query = {
      "attributes.type": 'mdTemplate'
    };

    return database.findAsync(query).then(function(templates) {
      return templates.map(function(t) {
        return new Template(t);
      });
    });
  };

  return Template;
});
