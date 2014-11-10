(function () {

  App.Views.AddCar = Backbone.View.extend({

    tagName: 'ul',
    className: 'carAdd',

    events: {
      'click #addCar' : 'addNewCar'
    },

    initialize: function(){
      this.render();

      $('#carContainer').html(this.$el);
    },

    render: function() {
      var form = $('#addCars').html();
      this.$el.html(form);
      $('.addCarButton').hide();

    },

    addNewCar: function (e) {
      e.preventDefault();

      //store the car values
      var car_name = $('#name').val();
      var car_make = $('#make').val();
      var car_model = $('#model').val();
      var car_topSpeed = $('#topSpeed').val();
      var car_description = $('#description').val();
      var car_image = $('#imgSrc').val();

      var car = new App.Models.Car({
        name: car_name,
        make: car_make,
        model: car_model,
        topSpeed: car_topSpeed,
        description: car_description,
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
