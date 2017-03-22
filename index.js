#!/usr/bin/env node

// # node rename.js
// node shell scripting

// Ensure that files are able to be modified
// Possible chmod needs to happen too

const colors = require('colors');
const program = require('commander');
const fs = require('fs');
const path = require('path');
let folder = 'path'; // Folder the script reads to replace text
let regex = /\(.+\)|[^a-zA-Z0-9.\s\&\,]/gi; // rename.js finds `regex` to replace with `replaceWith`, which replaces with whatver
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
    let check = fs.readdirSync(folder); // Updates per cycle

    if (fs.statSync(path.join(folder, directory[i])).isFile()) {
      if (directory[i].match(regex) && directory[i].charAt(0) != '.') {

        console.log(`Processing ${directory[i]}`);

        let ext = path.extname(directory[i]); // Extension
        let a = path.basename(directory[i], ext)
          .replace(/_|-/g, ' ') // Replaces _ with ' '
          .replace(regex, replace) // basename with regex applied
          .replace(/\s\s/g, ' '); // Condenses double spaces
        if (a.charAt(a.length - 1) == ' ') {
          a = a.slice(0, -1) + ext; // Removes ' '
        } else {
          a = a + ext;
        };
        let prev = path.join(folder, directory[i]);
        let next = path.join(folder, a);
        if (check.indexOf(a) > -1) {
          console.log('Err! Program would overwrite existing file.'.red);
          // return;
        } else {
          fs.renameSync(prev, next);
          console.log(`${directory[i]} => ${a}`);
        }
      }
    } else if (fs.statSync(path.join(folder, directory[i])).isDirectory()) {
      let newPath = path.join(folder, directory[i]);
      massRename(newPath, regex, replace);
    } else {
      console.log(`No valid target file for ${directory[i]}.`);
    }
  };
};

massRename(folder, regex, replace);

exports.module = (folder, regex, replace) => {
  massRename(folder, regex, replace);
};
