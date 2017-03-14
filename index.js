// # node rename.js
// node shell scripting
//
// Ensure that files are able to be modified
// Possible chmod needs to happen too

const fs = require('fs');
const path = require('path');
let folder = path.join(`${folder}`); // Folder the script reads to replace text
let regex = /_/gi; // rename.js finds `regex` to replace with `replaceWith`, which replaces with whatver
let replaceWith = `${string}`;

var dirSync = fs.readdirSync(folder);
for (i=0; i < directory.length; i++) {
  if (directory[i].match(regExp)) {
    fs.renameSync(
      path.join(folder, directory[i]),
      path.join(folder, directory[i].replace(regex, replaceWith))
    );
  };
};
