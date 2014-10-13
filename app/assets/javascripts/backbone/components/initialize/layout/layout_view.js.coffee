@Student.module "InitializeApp.Layout", (Layout, App, Backbone, Marionette, $, _) ->

  class Layout.LayoutDefault extends Marionette.LayoutView
    template: "initialize/layout/templates/default_layout"
    regions:
      mainRegion: "#main-region"


  class Layout.LayoutSpecial extends Marionette.LayoutView
    template: "initialize/layout/templates/special_layout"
    regions:
      headerRegion: "#header-region"
      mainRegion: "#main-region"
      footerRegion: "#footer-region"
