const fs = require('fs')
const {exec} = require('child_process')


fs.writeFile('test.txt', 'Hello file', (err) => {
    if (err)
        console.log(err.message)
})
fs.readFile('test.txt', 'utf-8', (err) => {
    if(err)
        console.log(err)
})