/**
 * Created by Andrei on 5/31/15.
 */
define(['marionette'], function (Marionette) {

    (function(){
        _.extend(Marionette.Application.prototype, {
            navigate: function (route, options) {
                options || (options = {});
                Backbone.history.navigate(route, options);
            },
            getCurrentRoute: function () {
                return Backbone.history.fragment;
            }
        });

        _.extend(Marionette.TemplateCache.prototype, {
            // Load a template from the DOM, by default. Override
            // this method to provide your own template retrieval
            // For asynchronous loading with AMD/RequireJS, consider
            // using a template-loader plugin as described here:
            // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
            loadTemplate: function(templateId) {
                var template = templateId; //Backbone.$(templateId).html();

                if (!template || template.length === 0) {
                    throwError('Could not find template: "' + templateId + '"', 'NoTemplateError');
                }

                return template;
            }
        });
    }(Backbone));

    return;

});

