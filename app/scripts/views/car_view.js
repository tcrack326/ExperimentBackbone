App.Views.CarView = Backbone.View.extend({

  tagName: 'li',
  className: 'car',

  events: {
    'click button' : 'deleteCar'
  }

  initialize: function () {
    this.render(App.all_Cars);

    //update our view when adding/deleting a car
    App.all_Cars.on('sync', this.render, this);
  },

  render: function () {
    //Binding 'this' to 'self' for use in nexted functions/callbacks
    var self = this;

    //Straight up underscore template
    var template = $('#carTemplate').html();
    var rendered = _.template(template);

    // Iterating over our models
    _.each(App.all_Cars.models, function(car) {
      //Each iteration.. appending the data to our element
      // that Backbone created
      self.$el.append(rendered(car.attributes));

    });

    //Take the data and append it into a specific element on my page
    $('#coolCars').html(this.el);

    return this;
  },

  deleteCar: function(e) {
    e.preventDefault();

    var id = $(e.target).attr('id');

    var deleteCar = App.all_Cars.get(id);

    deleteCar.destroy();
  }


});
