@Student.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->
  class Entities.UserModel extends Entities.Model
    urlRoot: "/api/users"

  class Entities.UsersCollection extends Entities.Collection
    model: Entities.UserModel
    url: "/api/users"

  class Entities.UserSessionModel extends Entities.Model
    isGuest: ->
      console.log @get("access_token")
      if @get("access_token")
        alert "Вы авторизированы"
      else
        alert "Вы не авторизированы"

    checkUserSession: ->
      currentUserDataString = $.cookie('current_user');
      if currentUserDataString
        currentUserData = JSON.parse(currentUserDataString)
        @set(currentUserData)
        console.log currentUserData
        console.log "You are sign_up!"

    logoutUserSession: ->
      $.cookie('current_user', null);
      console.log("Сессия закрыта")
      location.reload()

    createUser: (attributes, callback) ->

      CreateUserModel = Backbone.Model.extend
        url: App.routes.createUserPath

      createUserModel = new CreateUserModel(attributes)
      saveOptions = {
        success: =>
          callback("success")
        error: (model, response) =>
          callback("error",response)

      }

      createUserModel.save attributes, saveOptions

    authenticateUser: (tokenResponse) ->
      $.ajax App.routes.userSessionPath,
        type: 'GET'
        headers: { "Authorization": "Bearer #{ tokenResponse.access_token }" }
        error: (jqXHR, textStatus, errorThrown) ->
          console.log jqXHR
        success: (data, textStatus, jqXHR) ->
          authResponse = jqXHR.responseJSON
          $.cookie('current_user',  JSON.stringify($.extend(authResponse,tokenResponse)))
          console.log "Signed in!!!"
          console.log authResponse
          console.log tokenResponse.access_token
          console.log tokenResponse

    getToken: ->
      formData = new FormData()
      formData.append "username", @get("username")
      formData.append "password", @get("password")
      formData.append "grant_type", "password"
      formData.append "client_id", App.config.api.clientId

      request = new XMLHttpRequest()
      request.open "POST", App.routes.userTokenPath
      request.onreadystatechange = (e) =>
        if request.readyState == 4
          tokenResponse = JSON.parse(e.srcElement.responseText)
          unless tokenResponse.error
            @authenticateUser(tokenResponse)
          else
            @trigger "token:get:failed", [{ name: "email", message: "login error" }]

      request.send formData



  API =
    getModel: (options) -> new Entities.UserModel(options)
    getUserSessionModel: (options) -> new Entities.UserSessionModel(options)



  App.reqres.setHandler "entities:users:model", (options) -> API.getModel(options)
  App.reqres.setHandler "entities:users:session:model", (options) -> API.getUserSessionModel(options)