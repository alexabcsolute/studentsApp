@Student.module "UsersApp.SignUp", (SignUp, App, Backbone, Marionette, $, _) ->
  SignUp.Controller =

    signUp: ->
      userSessionModel = App.request "entities:users:session:model"
      signUpFormModel = @getSignUpModel()
      console.log signUpFormModel
      @layout = @getLayoutView model: signUpFormModel

      #######
      @layout.on "submit:form:event", =>
        signUpFormModel.on "validation:false", (errors) =>
          @layout.showErrors errors

        if signUpFormModel.isValid()
          signUpFormModel.set("role", "teacher")
          callback = (status, response) => ## объявление функции (анонимной)
            if status = "error"
              errors= []
              _(response.responseJSON).each (value, key) =>
                errors.push name: key, message: value
                @layout.showErrors errors

          userSessionModel.createUser signUpFormModel.attributes, callback
         # userSessionModel.checkUserSession signUpFormModel.attributes, callbackCookie

      App.bodyLayout.mainRegion.show @layout

    getLayoutView: (options) ->
      new SignUp.Layout(options)

    getSignUpModel: ->
      CreateUserFormModel = Backbone.Model.extend
        validate: ->
          errors = []
          if @get('first_name') == '' then errors.push name: 'first_name', message: 'First name is empty'
          if @get('last_name') == '' then errors.push name: 'last_name', message: 'Last name is empty'
          if @get('email') == '' then errors.push name: 'email', message: 'Email is empty'
          if @get('password') == '' then errors.push name: 'password', message: 'Password is empty'
          if @get('repeat_password') == '' then errors.push name: 'repeat_password', message: 'Repeat password is empty'

          unless @get('email') == ''
            emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            unless emailFilter.test @get('email') then errors.push name: 'email', message: 'Email is incorrect'

          unless @get('password') == ''
            unless @get('password') == @get('repeat_password') then errors.push name: 'repeat_password', message: 'Password and repeat password are not equal'
          if errors.length > 0
            console.log errors.length
            @trigger "validation:false", errors
            return errors
          else
            return false

      new CreateUserFormModel()




#defaults: { email: "", password: "" }
