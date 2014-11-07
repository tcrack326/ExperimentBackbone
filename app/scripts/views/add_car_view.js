(function () {

  App.Views.AddCar = Backbone.View.extend({

    events: {
      'click button' : 'addNewCar'
    },

    initialize: function(){
      this.render();

      $('#carContainer').html(this.$el);
    },

    render: function() {
      var form = $('#addCars').html();
      this.$el.html(form);

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

      //Save and route back to home
      App.all_Cars.add(car).save(null,

        {
          success: function () {
            App.router.navigate('', {trigger: true});
        }

        });

      $('#addCarForm')[0].reset();
    }


  });


}());
