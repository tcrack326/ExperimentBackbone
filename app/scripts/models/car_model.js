App.Models.Car = Backbone.Model.extend({

  defaults: {
    name: '',
    make: '',
    model: '',
    imgSrc: '',
    description: ''
  },

  idAttribute: '_id',

  initialize: function () {

  }

});
