@Student.module "HeaderApp", (HeaderApp, App, Backbone, Marionette, $, _) ->
  API =
    showHeader: ->
      HeaderApp.Show.Controller.showHeader()
      console.log "showHeader"


  