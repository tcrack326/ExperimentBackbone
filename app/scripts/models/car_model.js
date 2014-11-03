var Car = Backbone.Model.extend({

  defaults: {
    name: '',
    make: '',
    model: '',
    imageSrc: ''
  },

  idAttribute: '_id',

  initialize: function () {
    var n = this.get('name');
    console.log(n + ' has been added!');
  }

});
