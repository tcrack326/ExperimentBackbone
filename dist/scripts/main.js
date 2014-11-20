(function (){
  window.App = {};
      App.Models = {};
      App.Collections = {};
      App.Views = {};
      App.Routers = {};
}());

App.Models.Car = Backbone.Model.extend({

  defaults: {
    name: '',
    make: '',
    model: '',
    imgSrc: '',
    description: '',
    topSpeed: ''
  },

  idAttribute: '_id',

  initialize: function () {

  }

});

(function () {

  App.Collections.Cars = Backbone.Collection.extend ({
    model: App.Models.Car,
    comparator: function (model){
      return model.get(name);
    },
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/thomasbbcars"
  });

}());

(function (){

  App.Views.CarView = Backbone.View.extend({

    tagName: 'ul',
    className: 'cars',

    events: {
      'click button' : 'deleteCar'
    },

    template: _.template($('#cars').html()),

    initialize: function (options) {
      this.options = options;
      this.render();
      //reset events on the backbone objects
      this.collection.off();
      //update our view when adding/deleting a car
      this.collection.on('sync', this.render, this);
      this.collection.on('destroy', this.render, this);

      //Take the data and append it into a specific element on my page
      $('#carContainer').html(this.el);
    },

    render: function () {
      //Binding 'this' to 'self' for use in nexted functions/callbacks
      var self = this;

      this.$el.empty();

      //show the add button
      $('.addCarButton').show();

      //attempt to sort...
      if (this.options.sort === undefined) {
        // Sort from our default comparator in our collection constructor
        this.collection.sort();
        this.collection.each(function (car) {
          self.$el.append(self.template(car.toJSON()));
        });
      }

      else {
        var sortedCollection = this.collection.sortBy( function (model) {
          return model.get(self.options.sort);
        });
        _.each(sortedCollection, function (car) {
          self.$el.append(self.template(car.toJSON()));
        })
      }

      return this;
    },

    deleteCar: function(e) {
      e.preventDefault();

      var id = $(e.target).attr('id');

      var deleteCar = App.all_Cars.get(id);

      deleteCar.destroy();
    }


  });

}());

(function () {

  App.Views.AddCar = Backbone.View.extend({

    tagName: 'ul',
    className: 'carAdd',

    events: {
      'click #addCar' : 'addNewCar'
    },

    initialize: function(){
      this.render();

      $('#carContainer').html(this.$el);
    },

    render: function() {
      var form = $('#addCars').html();
      this.$el.html(form);
      $('.addCarButton').hide();

    },

    addNewCar: function (e) {
      e.preventDefault();

      //store the car values
      var car_name = $('#name').val();
      var car_make = $('#make').val();
      var car_model = $('#model').val();
      var car_topSpeed = $('#topSpeed').val();
      var car_description = $('#description').val();
      var car_image = $('#imgSrc').val();

      var car = new App.Models.Car({
        name: car_name,
        make: car_make,
        model: car_model,
        topSpeed: car_topSpeed,
        description: car_description,
        imgSrc: car_image
      });

      //Save and route back to home
      App.all_Cars.add(car).save(null,

        {
          success: function () {
            App.router.navigate('', {trigger: true});
        }

        });

      $('#addCarForm')[0].reset();
    }


  });


}());

(function () {

  App.Views.SingleCar = Backbone.View.extend({

    tagName: 'ul',
    className: 'carSingle',

    events: {
      'click #updateCar' : 'updateCar',
      'click #delete' : 'deleteCar'
    },

    template: _.template($('#singleCarTemplate').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#carAdder').empty();

      // Get our Element On Our Page
      $('#carContainer').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.car.toJSON()));

    },

    updateCar: function (e) {
      e.preventDefault();

      // Update car
      this.options.car.set({
        name: $('#update_name').val(),
        make: $('#update_make').val(),
        model: $('#update_model').val(),
        topSpeed: $('#update_topSpeed').val(),
        imgSrc: $('#update_imgSrc').val(),
        description: $('#update_description').val()
      });

      // Save new Instance
      this.options.car.save();

      // Go to home page
      App.router.navigate('', {trigger: true});

    },

    deleteCar: function (e) {
      e.preventDefault();

      // Remove Car
      this.options.car.destroy();

      // Go home, ET
      App.router.navigate('', {trigger: true});

    }

  });

}());

(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:id' : 'editCar',
      'add' : 'addCar',
      'sort/:sortByVar' : 'home'
    },

    home: function (sortByVar) {
      new App.Views.CarView({ collection: App.all_Cars, sort: sortByVar });
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

(function() {

//Create instance of cars collection
App.all_Cars = new App.Collections.Cars();

//Pull our cars from our server
App.all_Cars.fetch().done(function () {
  //App.carsView = new App.Views.CarView({
    //collection: App.all_Cars
    App.router = new App.Routers.AppRouter();

});

}());
