@Student.module "HomeApp.Main", (Main, App, Backbone, Marionette, $, _) ->

  class Main.Layout extends Backbone.Marionette.LayoutView
    template: "home/main/templates/main_layout"

