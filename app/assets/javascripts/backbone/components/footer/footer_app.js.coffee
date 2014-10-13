@Student.module "FooterApp", (FooterApp, App, Backbone, Marionette, $, _) ->
  API =
    showFooter: ->
      FooterApp.Show.Controller.showFooter()
      console.log "showFooter"
