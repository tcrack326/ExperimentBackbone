(function () {}(

  App.Collection.Cars = Backbone.Collection.extend ({
    model: App.Models.Car,
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/thomasbbcars"
  });

));
