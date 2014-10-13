@Student.module "HeaderApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Layout extends Marionette.LayoutView
    template: "header/show/templates/show_layout"
    regions:
      menuRegion: "#menu-region"

  class Show.ItemView extends Marionette.ItemView
    template: "header/show/templates/_show_item_view"
    tagName: "li"

  class Show.CollectionView extends Marionette.CollectionView
    tagName: "ul"
    className: 'menu'
    childView: Show.ItemView

