@Student.module "FooterApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Layout extends Marionette.LayoutView
    template: "footer/show/templates/show_layout"
    regions:
      footerRegion: "#footer-region"

  class Show.ItemView extends Marionette.ItemView
    template: "footer/show/templates/_show_item_view"
    tagName: "li"

  class Show.CollectionView extends Marionette.CollectionView
    tagName: "ul"
    className: 'footer'
    childView: Show.ItemView
