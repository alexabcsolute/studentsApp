@Student.module "HeaderApp.Show", (Show, App, Backbone, Marionette, $, _) ->
  Show.Controller =
    showHeader: ->
      layout = @getLayoutView()
      layout.on "render", =>
        @showMenuCollection(layout)

      App.bodyLayout.headerRegion.show layout

    getLayoutView: ->
      showHeader = new Show.Layout

    showMenuCollection: (layout) ->
      menuCollection = @getCollectionModels()
      console.log menuCollection
      menuView = @getCollectionView()
      menuView.collection = menuCollection
      console.log menuView.render().el
      layout.menuRegion.show menuView
      console.log menuCollection

    getCollectionModels: ->
      collectionModels = new Backbone.Collection [
        { title: "Home", href: "#Home" }
        { title: "Students", href: "#Students" }
        { title: "About", href: "#About" }
      ]

    getCollectionView: (options) ->
      showCollectionView = new Show.CollectionView(options)





