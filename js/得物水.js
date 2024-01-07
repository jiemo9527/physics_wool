while(true){
  var x = 1200;
  var y = 2350;
  var duration = 20000;

  press(x, y, duration);

  function press(x, y, duration) {
    gesture(duration, [x, y], [x, y]);
    }
    sleep(2500);

}