'use client'
import {configure} from 'browserfs'
// import { Terminal } from './parseTerminalData'
const BrowserFS = require("browserfs");

let initialized = false

export async function initializeFileSystem(terminals){

    configure({
      fs: "LocalStorage",
      options:{
        writable: {
          fs: "LocalStorage"
        },    readable: {
          fs: "LocalStorage"
        }

      },
    }, (e) => {
      if (e) {
        reject(e)
        return
      }

      // fs = BrowserFS.BFSRequire('fs')
      initialized = true

      // Create initial files
      terminals.forEach(terminal => {
        const content = `Name: ${terminal.name}
Type: ${terminal.type}
Connectivity: ${terminal.connectivity}
User Interface: ${terminal.userInterface}
Operating System: ${terminal.operatingSystem}
Description: ${terminal.description}`

        // fs.writeFile(`/${terminal.name}.txt`, content, (err) => {
        //   if (err) console.error(`Error creating file for ${terminal.name}:`, err)
        // })
      })

      // resolve()
    })
  
}

export function getFS() {
  if (!initialized) {
    throw new Error('File system not initialized')
  }
  return fs
}

