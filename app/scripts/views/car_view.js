(function (){

  App.Views.CarView = Backbone.View.extend({

    tagName: 'ul',
    className: 'cars',

    events: {
      'click button' : 'deleteCar'
    },

    initialize: function () {
      this.render(App.all_Cars);

      //update our view when adding/deleting a car
      App.all_Cars.on('sync', this.render, this);
      App.all_Cars.on('destroy', this.render, this);

      //Take the data and append it into a specific element on my page
      $('#carContainer').append(this.el);
    },

    render: function () {
      //Binding 'this' to 'self' for use in nexted functions/callbacks
      var self = this;

      //Straight up underscore template
      var template = $('#cars').html();
      var rendered = _.template(template);

        //Clear our El
        this.$el.empty();

      // Iterating over our models
      _.each(App.all_Cars.models, function(car) {
        //Each iteration.. appending the data to our element
        // that Backbone created
        self.$el.append(rendered(car.attributes));

      });



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
