(function () {

  App.Collections.Cars = Backbone.Collection.extend ({
    model: App.Models.Car,
    comparator: function (model){
      return model.get(name);
    },
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/thomasbbcars"
  });

}());
