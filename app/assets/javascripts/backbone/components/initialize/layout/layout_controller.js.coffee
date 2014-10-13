@Student.module "InitializeApp.Layout", (Layout, App, Backbone, Marionette, $, _) ->

  Layout.Controller =
    itializeLayout: ->
      layoutDefault = new Layout.LayoutDefault
      layoutSpecial = new Layout.LayoutSpecial

      route = window.location.hash
      console.log route
      if route=="#u"
        App.bodyLayout = layoutDefault
      else
        App.bodyLayout = layoutSpecial

#      console.log App.bodyLayout

      App.mainRegion.show App.bodyLayout
