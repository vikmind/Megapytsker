const gm = require('gm');
function handle(err){
  console.log(err.message);
}
const options = {
  file: '../public/runs/diff.png',
  highlightColor: 'yellow',
  tolerance: 0.02
}
gm.compare('../public/runs/29/tesst.png', '../public/runs/30/tesst.png', options, function (err, isEqual, equality, raw, path1, path2) {
  if (err) return handle(err);

  // if the images were considered equal, `isEqual` will be true, otherwise, false.
  console.log('The images were equal: %s', isEqual);

  // to see the total equality returned by graphicsmagick we can inspect the `equality` argument.
  console.log('Actual equality: %d', equality);

  // inspect the raw output
  console.log(raw);

  // print file paths
  console.log(path1, path2);
})
