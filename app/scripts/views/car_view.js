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

        //Clear our El
        this.$el.empty();

      this.collection.each(function (c) {
        self.$el.append(self.template(c.toJSON()));
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
