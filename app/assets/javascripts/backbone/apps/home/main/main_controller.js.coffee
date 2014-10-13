@Student.module "HomeApp.Main", (Main, App, Backbone, Marionette, $, _) ->

  Main.Controller =

    main: ->
      @layout = @getLayoutView()
      App.bodyLayout.mainRegion.show @layout
      console.log "sfsd"

    getLayoutView: ->
      new Main.Layout
