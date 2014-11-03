
var allCars = new Cars();
allCars.fetch().done(function () {

  var carview = new CarView({
    collection: allCars
  });

});


$('#addCarForm').on('submit', function(e) {
  //Prevent the default action of our form submission
  e.preventDefault();

  if( $('#name').val().length != 0 || $('#make').val().length != 0 || $('#model').val().length != 0 || $('#imgSrc').val().length != 0 ){
    //Grab the name from the input
    var car_name = $('#name').val();
    var car_make = $('#make').val();
    var car_model = $('#model').val();
    var car_imgSrc = $('#imgSrc').val();

    //Create a new instance of our Car constructor (Backbone.Model)
    var car = new Car({
      name: car_name,
      make: car_make,
      model: car_model,
      imgSrc: car_imgSrc
    });


    //Access our Collection and add our new instance (car) to our collection
    allCars.add(car);

    //Save our car - this looks for a URL or a URL field in our Collection
    // and save it to that URL using a simple POST method

    car.save();

    //Clear my form
    $(this)[0].reset();

    //Add to the car to the html list
      var carview = new CarView({
        collection: allCars
      });
  }

  else {
    alert("Enter all values for the car");
  }
});

//delete car from the list
var delete_car;

$('#coolCars').on('click', 'button', function(event){
    event.preventDefault();
    event.stopPropagation();

    var myID = $(this).attr('id');

    delete_car = allCars.findWhere({ _id: myID });
    console.log(delete_car);
    delete_car.destroy(); //now working!!

    $(this).parent().remove();

});
