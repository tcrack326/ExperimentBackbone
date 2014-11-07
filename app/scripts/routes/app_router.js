(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:id' : 'editCar'
    },

    home: function () {
      new App.Views.CarsAdd();
      new App.Views.CarView({ collection: App.all_Cars });
    },

    editCar: function (id) {

      var c = App.all_Cars.get(id);

      new App.Views.SingleCar({ car: c });
    }

  });

}());
