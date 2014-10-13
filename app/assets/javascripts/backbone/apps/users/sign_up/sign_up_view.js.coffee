@Student.module "UsersApp.SignUp", (SignUp, App, Backbone, Marionette, $, _) ->

  class SignUp.Layout extends Marionette.LayoutView
    template: "users/sign_up/templates/sign_up_layout"
    events: {"submit form": "submitFormEvent"}

    submitFormEvent: (e) ->
      e.preventDefault()
      console.log @model.attributes
      @model.set("first_name", $(@el).find("#first_name").val())
      @model.set("last_name", $(@el).find("#last_name").val())
      @model.set("email", $(@el).find("#email").val())
      @model.set("password", $(@el).find("#password").val())
      @model.set("repeat_password", $(@el).find("#repeat_password").val())
      @trigger "submit:form:event", @model.attributes

    showErrors: (errors) ->
      console.log errors.length
      alert = $(@el).find(".alert").html("").removeClass("hidden")
      _.each errors, (error) =>
        if error.message
          alert.append "#{ error.message }<br/>"
        else
          alert.append "#{ error }<br/>"

