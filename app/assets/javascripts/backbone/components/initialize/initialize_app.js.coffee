@Student.module "InitializeApp", (InitializeApp, App, Backbone, Marionette, $, _) ->

  API =
    itializeLayout: (options) ->
      InitializeApp.Layout.Controller.itializeLayout()

  InitializeApp.on 'start', (options) ->
    API.itializeLayout options