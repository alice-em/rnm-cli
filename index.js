#!/usr/bin/env node

// # node rename.js
// node shell scripting

// Ensure that files are able to be modified
// Possible chmod needs to happen too

const program = require('commander');
const fs = require('fs');
const path = require('path');
let folder = path.join(`${folder}`); // Folder the script reads to replace text
let regex = /_/gi; // rename.js finds `regex` to replace with `replaceWith`, which replaces with whatver
let replace = `${string}`;

let massRename;

program
  .version('0.0.1')
  .usage('[options] <string> <directory>')
  .option('-c --copy <string> <directory> <destination>', 'Makes a copy')
  .parse(process.argv);

massRename = (folder, regex, replace) => {
  let directory = fs.readdirSync(folder);
  for (i=0; i < directory.length; i++) {
    if (directory[i].match(regExp)) {
      fs.renameSync(
        path.join(folder, directory[i]),
        path.join(folder, directory[i].replace(regex, replace))
      );
    };
  };
};

exports.module = (folder, regex, replace) => {
  massRename(folder, regex, replace);
};
