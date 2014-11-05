App.Models.Car = Backbone.Model.extend({

  defaults: {
    name: '',
    make: '',
    model: '',
    imgSrc: ''
  },

  idAttribute: '_id',

  initialize: function () {

  }

});
