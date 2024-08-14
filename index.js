const Discord = require("discord.js");
const config = require("./config.json");
const ethers = require('ethers');
const abi = require("./abi.json");
const provider = new ethers.providers.InfuraWebSocketProvider(config.INFURA.NETWORK, config.INFURA.KEY);

const contract = new ethers.Contract(
    config.CONTRACT_ADDRESS,
    abi,
    provider
);

const client = new Discord.Client({ intents: [] });
client.login(config.LEFT_BOT_TOKEN);

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});
async function getLeft() {
    try {
        let totalSupply = await contract.totalSupply();
         return config.MAX_SUPPLY - totalSupply;
    } catch (error) {
        console.log(error);
        return null
    }
}
async function checkLeft() {
    try {
        let count = await getLeft();
        client.user.setActivity(`${count} Left`, {
            type: 'WATCHING'
        });
    } catch (error) {
        console.log(error)
        return "error"
    }
}
setInterval(checkLeft, 5000);