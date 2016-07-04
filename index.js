/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Pomegranate-express-application
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
var Express = require('express');

/**
 * Provides the Express App, Express Router Factory and Middleware object.
 * @module Application
 * @injector {Dynamic} Adds a dynamic number of objects.
 * @property {Object} options Plugin Options
 * @property {Boolean} options.caseSensitiveRoutes=false
 * @property {Boolean} options.mergeReqParams=false
 * @property {Boolean} options.strictRouting=false
 * @injects {Service} Express - Configurable instance of Express.
 * @injects {Factory} Router - Provides instances of Express.Router() to define routes on.
 * @injects {Merge} Middleware - An object spanning all of the middleware in a project.
 *
 */
module.exports = {
  options: {
    caseSensitiveRoutes: true,
    mergeReqParams: false,
    strictRouting: false
  },
  metadata: {
    name: 'ExpressCore',
    type: 'dynamic'
  },
  plugin: {
    load: function(inject, loaded) {
      var routerOptions = {
        caseSensitive: this.options.caseSensitiveRoutes,
        mergeParams: this.options.mergeReqParams,
        strict: this.options.strictRouting
      }

      var App = Express()

      function configRouter(){
        return Express.Router(routerOptions)
      }
      var Deps = [
        {param: 'Express', load: App},
        {param: 'Router', load: configRouter, type: 'factory'},
        {param: 'Middleware', load: {}, type: 'merge'},
        {param: 'ExpressConfig', load:{}, type: 'merge'}
      ]
      loaded(null, Deps)
    },
    start: function(done) {
      done()
    },
    stop: function(done) {
      done()
    }
  }
};