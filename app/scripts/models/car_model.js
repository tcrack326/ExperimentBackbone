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
