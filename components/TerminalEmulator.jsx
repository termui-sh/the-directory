
import React, { useEffect, useInsertionEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { Terminal as TerminalType } from '../utils/parseTerminalData'
import { initializeFileSystem, getFS } from '../utils/fileSystem'



export default function TerminalEmulator({ terminals }) {
  const terminalRef = useInsertionEffect(null)
  const xtermRef = useRef(null)
  const inputRef = useRef('')

  useEffect(() => {
    const initTerminal = async () => {
      await initializeFileSystem(terminals)

      if (terminalRef) {
        const term = new Terminal({
          cursorBlink: true,
          fontSize: 14,
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        })
        const fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        term.open(terminalRef.current)
        fitAddon.fit()
        xtermRef.current = term

        term.writeln('Welcome to the Terminal Directory CLI!')
        term.writeln('Type "help" for a list of available commands.')
        term.write('\r\n$ ')

        term.onKey(({ key, domEvent }) => {
          const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

          if (domEvent.keyCode === 13) { // Enter key
            const command = inputRef.current.trim()
            if (command) {
              term.write('\r\n')
              executeCommand(command)
            }
            term.write('\r\n$ ')
            inputRef.current = ''
          } else if (domEvent.keyCode === 8) { // Backspace
            if (inputRef.current.length > 0) {
              inputRef.current = inputRef.current.slice(0, -1)
              term.write('\b \b')
            }
          } else if (printable) {
            inputRef.current += key
            term.write(key)
          }
        })
      }
    }

    initTerminal()

    return () => {
      if (xtermRef.current) {
        xtermRef.current.dispose()
      }
    }
  }, [terminals])

  const executeCommand = (command) => {
    const term = xtermRef.current
    if (!term) return

    const [cmd, ...args] = command.split(' ')
    const fs = getFS()

    switch (cmd) {
      case 'ls':
        fs.readdir('/', (err, files) => {
          if (err) {
            term.writeln(`Error: ${err.message}`)
          } else {
            if (args.includes('-a')) {
              term.writeln(`. ..\n${files.join('\n')}`)
            } else {
              term.writeln(files.filter(f => !f.startsWith('.')).join('\n'))
            }
          }
        })
        break
      case 'cat':
        if (args.length === 0) {
          term.writeln('Usage: cat <filename>')
          break
        }
        const fileName = args[0]
        fs.readFile(`/${fileName}`, 'utf8', (err, data) => {
          if (err) {
            term.writeln(`Error: ${err.message}`)
          } else {
            term.writeln(data)
          }
        })
        break
      case 'grep':
        if (args.length < 2) {
          term.writeln('Usage: grep <search_term> <file1> [<file2> ...]')
          break
        }
        const searchTerm = args[0].toLowerCase()
        const filesToSearch = args.slice(1)
        filesToSearch.forEach(file => {
          fs.readFile(`/${file}`, 'utf8', (err, data) => {
            if (err) {
              term.writeln(`${file}: Error - ${err.message}`)
            } else {
              const lines = data.split('\n')
              const matchingLines = lines.filter(line => 
                line.toLowerCase().includes(searchTerm)
              )
              if (matchingLines.length > 0) {
                term.writeln(`${file}:`)
                matchingLines.forEach((line, index) => {
                  term.writeln(`  ${index + 1}: ${line}`)
                })
              } else {
                term.writeln(`${file}: No matches found`)
              }
            }
          })
        })
        break
      case 'help':
        term.writeln('Available commands:')
        term.writeln('  ls [-a]          List all files')
        term.writeln('  cat <filename>   Display contents of a file')
        term.writeln('  grep <term> <file1> [<file2> ...]  Search for a term in files')
        term.writeln('  help             Display this help message')
        break
      default:
        term.writeln(`Command not found: ${cmd}`)
    }
  }

  return <div ref={terminalRef} className="h-[400px]" />
}

