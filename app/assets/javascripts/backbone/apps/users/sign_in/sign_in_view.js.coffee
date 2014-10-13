@Student.module "UsersApp.SignIn", (SignIn, App, Backbone, Marionette, $, _) ->
  class SignIn.Layout extends Marionette.LayoutView
    template: "users/sign_in/templates/sign_in_layout"
    events: {"submit form": "submitFormEvent"}

    submitFormEvent: (e) ->
      e.preventDefault()
      console.log @model.attributes
      @model.set("email", $(@el).find("#email").val())
      @model.set("password", $(@el).find("#password").val())
      @trigger "submit:form:event", @model.attributes

    showErrors: (errors) ->
      console.log errors.length
      alert = $(@el).find(".alert").html("").removeClass("hidden")
      _.each errors, (error) =>
        if error.message
          alert.append "#{ error.message }<br/>"
        else
          alert.append "#{ error }<br/>"