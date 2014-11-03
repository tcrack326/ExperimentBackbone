var CarView = Backbone.View.extend({

  tagName: 'li',
  className: 'car',

  initialize: function (options) {
    this.render(options.collection);
  },

  render: function (collection) {
    //Binding 'this' to 'self' for use in nexted functions/callbacks
    var self = this;

    //Straight up underscore template
    var template = $('#carTemplate').html();
    var rendered = _.template(template);

    // Iterating over our models
    _.each(collection.models, function(car) {
      //Each iteration.. appending the data to our element
      // that Backbone created
      self.$el.append(rendered(car.attributes));

    });

    //Take the data and append it into a specific element on my page
    $('#coolCars').html(this.el);

    return this;
  }


});
