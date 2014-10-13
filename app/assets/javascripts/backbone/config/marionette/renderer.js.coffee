Backbone.Marionette.Renderer.render = (template, data) ->

  if JST["backbone/apps/" + template]
    JST["backbone/apps/" + template](data)

#  throw "Template #{template} not found!"
  else if JST["backbone/components/" + template]
    JST["backbone/components/" + template](data)

  else
    throw "Template #{template} not found!"






