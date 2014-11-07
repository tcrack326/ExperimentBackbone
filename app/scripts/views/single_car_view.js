(function () {

  App.Views.SingleCar = Backbone.View.extend({

    tagName: 'ul',
    className: 'carSingle',

    events: {
      'submit #updateCar' : 'updateCar',
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

      // Update our Model Instance
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
