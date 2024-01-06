while(true){
  var x = 1250;
  var y = 2550;
  x = x / 1440 * device.width
  y = y / 3168 * device.height
  var duration = 20000;

  press(duration, x, y);
  sleep(2500);

}