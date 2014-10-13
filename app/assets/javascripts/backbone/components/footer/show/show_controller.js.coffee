@Student.module "FooterApp.Show", (Show, App, Backbone, Marionette, $, _) ->
  Show.Controller =
    showFooter: ->
      layout = @getLayoutView()
      layout.on "render", =>
        @showMenuCollection(layout)

      App.bodyLayout.footerRegion.show layout

    getLayoutView: ->
      showFooter = new Show.Layout

    showMenuCollection: (layout) ->
      menuCollection = @getCollectionModels()
      console.log menuCollection
      menuView = @getCollectionView()
      menuView.collection = menuCollection
      console.log menuView.render().el
      layout.footerRegion.show menuView
      console.log menuCollection

    getCollectionModels: ->
      collectionModels = new Backbone.Collection [
        { title: "Home", href: "#Home" }
        { title: "Students", href: "#Students" }
        { title: "About", href: "#About" }
      ]

    getCollectionView: (options) ->
      showCollectionView = new Show.CollectionView(options)