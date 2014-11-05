(function () {

  App.Views.CarsAdd = Backbone.View.extend({

    el: '#carAdder',

    events: {
      'click button' : 'addNewCar'
    },

    initialize: function(){
      this.render();
    },

    render: function() {
      form_html = $('#addCars').html();
      this.$el.html(form_html);

    },

    addNewCar: function (e) {
      e.preventDefault();

      //Grab feels values from my form
      var car_name = $('#name').val();
      var car_make = $('#make').val();
      var car_model = $('#model').val();
      var car_image = $('#imgSrc').val();

      var car = new App.Models.Car({
        name: car_name,
        make: car_make,
        model: car_model,
        imgSrc: car_image
      });

      //Add to our collection and save to our server
      App.all_Cars.add(car).save();

      $('#addCarForm')[0].reset();
    }


  });


}());
