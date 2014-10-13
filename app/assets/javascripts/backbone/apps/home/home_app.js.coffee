@Student.module "HomeApp", (HomeApp, App, Backbone, Marionette, $, _) ->

  class HomeApp.Router extends Marionette.AppRouter
    appRoutes:
      "home": "main"

  API =

    main: ->
      HomeApp.Main.Controller.main()

  App.addInitializer ->

    new HomeApp.Router
      controller: API