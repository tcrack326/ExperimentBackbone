//car template
var carTemplate = $('#carTemplate').html();
var carRenderer = _.template(carTemplate);

var Car = Backbone.Model.extend({

  defaults: {
    name: '',
    make: '',
    model: '',
    imageSrc: ''
  },

  initialize: function () {
    var n = this.get('name');
    console.log(n + ' has been added!');
  }

});

var Cars = Backbone.Collection.extend ({
  model: Car,
  url: "http://tiy-atl-fe-server.herokuapp.com/collections/thomasbbcars"
});

var allCars = new Cars();
allCars.fetch();
console.log(allCars);

//add all the current cars to the list(can't use fetch "lazily" so use a regular ajax get call)
$.ajax({
  type: "GET",
  url:"http://tiy-atl-fe-server.herokuapp.com/collections/thomasbbcars",
  data: JSON
}).done(function(data){
  console.log(data);
  data.forEach(function(carObject){
    console.log(carObject);
    //$('#coolCars').append(carRenderer(carObject));
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

    console.log(car);

    //Access our Collection and add our new instance (car) to our collection
    allCars.add(car);

    //Save our car - this looks for a URL or a URL field in our Collection
    // and save it to that URL using a simple POST method

    car.save();

    //Clear my form
    $(this)[0].reset();

    //Add to the car to the html list
    $('#coolCars').append(carRenderer(car.attributes));
  }

  else {
    alert("Enter all values for the car");
  }
});
