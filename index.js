#!/usr/bin/env node

// # node rename.js
// node shell scripting

// Ensure that files are able to be modified
// Possible chmod needs to happen too

const colors = require('colors');
const program = require('commander');
const fs = require('fs');
const path = require('path');
let folder = 'Path/to/directory'; // Folder the script reads to replace text
let regex = /\(.+\) |\(.+\)|[^a-zA-Z0-9.\s\&\,]/gi; // rename.js finds `regex` to replace with `replaceWith`, which replaces with whatever
let replace = '';

let massRename;

program
  .version('0.0.1')
  .usage('[options] <string> <directory>')
  .option('-c --copy <string> <directory> <destination>', 'Makes a copy')
  .parse(process.argv);

massRename = (folder, regex, replace) => {
  let files = fs.readdirSync(folder);
  console.dir(files);
  for (let i = 0; i < files.length; i++) {
    let check = fs.readdirSync(folder); // Updates per cycle
    let prev = path.join(folder, files[i]);
    let stat = fs.statSync(prev);
    // console.log(prev)
    if (stat.isFile()) {
      if (files[i].match(regex) && files[i].charAt(0) != '.') {

        let ext = path.extname(files[i]); // Extension
        let basename = path.basename(files[i], ext)
          .replace(/\&/, 'and')
          .replace(/_/g, ' ') // Replaces _ with ' '
          .replace(regex, replace) // basename with regex applied
          .replace(/\s\s+/g, ' '); // Condenses double spaces
        if (basename.charAt(basename.length - 1) == ' ') {
          basename = basename.slice(0, -1) + ext; // Removes ' '
        } else {
          basename = basename + ext;
        };
        let next = path.join(folder, basename);
        if (check.indexOf(basename) > -1) {
          console.log(`:: Err! Program would overwrite existing file.\n:: File: ${prev}\n:: Dir: ${folder}`.red);
          break;
        } else {
          // fs.renameSync(prev, next);
          console.log(`${files[i]} => ${basename}`);
        }
      }
    } else if (stat.isDirectory() && files[i] != '.yacreaderlibrary') {
      let newPath = path.join(folder, files[i]);
      // console.log(`: Switching to folder ${newPath}`.green);
      massRename(newPath, regex, replace);
      // console.log(`: Returning to ${folder}`.green)
    } else {
      console.log(`No valid target file for ${files[i]}.`);
    }
  };
};

massRename(folder, regex, replace);

exports.module = (folder, regex, replace) => {
  massRename(folder, regex, replace);
};
