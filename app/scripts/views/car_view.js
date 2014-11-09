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
