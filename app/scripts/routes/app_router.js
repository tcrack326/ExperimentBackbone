(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:id' : 'editCar',
      'add' : 'addCar'
    },

    home: function () {
      new App.Views.CarView({ collection: App.all_Cars });
    },

    editCar: function (id) {

      var c = App.all_Cars.get(id);

      new App.Views.SingleCar({ car: c });
    },

    addCar: function() {
      new App.Views.AddCar();
    }

  });

}());
