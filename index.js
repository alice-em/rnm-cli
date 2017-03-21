#!/usr/bin/env node

// # node rename.js
// node shell scripting

// Ensure that files are able to be modified
// Possible chmod needs to happen too

const program = require('commander');
const fs = require('fs');
const path = require('path');
let folder = '/media/alicemod/Ajax/Comic Database/Action Comics (2016)'; // Folder the script reads to replace text
let regex = /\(.+\)|[^a-zA-Z0-9.\s]/gi; // rename.js finds `regex` to replace with `replaceWith`, which replaces with whatver
let replace = '';

let massRename;

program
  .version('0.0.1')
  .usage('[options] <string> <directory>')
  .option('-c --copy <string> <directory> <destination>', 'Makes a copy')
  .parse(process.argv);

massRename = (folder, regex, replace) => {
  let directory = fs.readdirSync(folder);
  for (i=0; i < directory.length; i++) {
    if (directory[i].match(regex)) {
      console.log(`Processing ${directory[i]}`);

      let ext = path.extname(directory[i]); // Extension
      let a = path.basename(directory[i], ext).replace(regex, replace); // basename with regex applied
      let b = a.charAt(a.length - 1); // Last character
      if (b == ' ') {
        a = a.slice(0, -1); // Removes ' '
      } else {
        // Nothing really
      };

      fs.renameSync(
        path.join(folder, directory[i]),
        path.join(folder, a + ext)
      );
      console.log(`${directory[i]} => ${a + ext}`);
    } else {
      console.log('No valid target files.');
    }
  };
};

massRename(folder, regex, replace);

exports.module = (folder, regex, replace) => {
  massRename(folder, regex, replace);
};
