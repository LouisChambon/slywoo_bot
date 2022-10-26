const fs = require('fs');

module.exports = async client => {

    fs.readdirSync("./Commands").filter(f => f.endsWith(".js")).forEach(async file => {

        let command = require(`../Commands/${file}`);
        if (!command.name ||typeof command.name !== "string") throw new TypeError(`Command ${file.slice(0, file.length - 3)} is not available.`)
        client.commands.set(command.name, command)
        // console.log(`Command ${file} loaded with success !`)
    })
}