@Student = do (Backbone, Marionette) ->

  App = new Marionette.Application
  App.config =
    api:
      clientId: 'qi0JGBFPwmV7z6svN1IrWcCMOgZK84T32DRjpEfu'

  App.coverApiPath = (path, options={}) =>
    if _(options).isEmpty() then options = { prefix: '/api/v1' }
    "https://app.musopen.org#{ options.prefix }/#{ path }"


  App.routes =
    userTokenPath: App.coverApiPath("oauth/token/")
    userSessionPath: App.coverApiPath("users/me/")
    createUserPath: App.coverApiPath("users/")

  App.rootRoute = "/"
  App.addRegions
    headerRegion: "#header-region"
    mainRegion: "#main-region"
    footerRegion: "#footer-region"


  App.on "start", (options) ->

    App.module('InitializeApp').start options: options

    App.HeaderApp.Show.Controller.showHeader()
    App.HomeApp.Main.Controller.main()
    App.FooterApp.Show.Controller.showFooter()
    App.currentUser = App.request "entities:users:session:model"
    App.currentUser.checkUserSession()
    App.currentUser.isGuest()




    if Backbone.history
      Backbone.history.start()
      @navigate(@rootRoute, trigger: true) if @getCurrentRoute() is ""


  App
