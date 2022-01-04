const core = require('@actions/core');

try {
  const files = core.getInput('files');
  const sourceString = core.getInput('source');
  const replacementString = core.getInput('replacement');
  var filenames = files.split(',');
  
  console.log('Replacing: "' + sourceString + '" with "' + replacementString + '" in ' + filenames.length + ' files...');

  for(var fi = 0; fi < filenames.length; fi++)
  {
    var filename = filenames[fi];
    var fs = require('fs');
    console.log('File ' + fi + ': ' + filename);
    fs.readFile(filename, 'utf8', function (err,source) {
      if (err) {
        console.log(err);
      } else {
        console.log('### Source ###');
        console.log(source);
        result = source.replace(sourceString, replacementString)
        console.log('### Result ###')
        console.log(result);
        fs.writeFile(filename, result, 'utf8', function (err) {
          if (err) 
            console.log(err)
          else 
            console.log(result)
        });
      }
    });
  }
} catch (error) {
  core.setFailed(error.message);
}
