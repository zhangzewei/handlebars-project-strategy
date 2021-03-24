const glob = require('glob');
const fs = require('fs');
const sassRender = require('node-sass').render;
const componentsCssFiles = glob.sync('src/components/**/*.scss');
const compileFiles = [
  {
    name: 'common',
    path: 'src/common/scss/index.scss'
  }
];


componentsCssFiles.forEach(filepath => {
  const filename = filepath.split('/')[2];
  compileFiles.push({
    name: filename,
    path: filepath
  })
});

compileFiles.forEach(async (file) => {
  const distFolder = `${process.cwd()}/dist/styles/css/${file.name}.css`;
  sassRender({
    file: file.path,
    outputStyle: 'expanded'
  }, (error, result) => {
    if (error) {
      console.log('error.status:', error.status); // used to be "code" in v2x and below
      console.log('error.column:', error.status);
      console.log('error.message:', error.message);
      console.log('error.line:', error.line);
    }
    else {
      fs.writeFile(distFolder, result.css, function(err){
        console.log(`--------- ${file.name} start to be writen ----------`);
        if(err){
          console.log(err);
        } else {
          console.log(`--------- ${file.name} done ---------`, '\n');
        }
      });
    }
  })
});