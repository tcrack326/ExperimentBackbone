(function() {

//Add our Form
new App.Views.CarsAdd();

//Create instance of cars collection
App.all_Cars = new App.Collections.Cars();

//Pull our cars from our server
App.all_Cars.fetch().done(function () {
  App.carsView = new App.Views.CarView({
    collection: App.all_Cars
  });
});

}());
