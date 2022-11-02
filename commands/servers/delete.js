const Discord = require("discord.js");
const axios = require("axios");


module.exports = {
    name: "delete",
  category: "servers", //the category this will be listed at, for the help cmd
    description: "delete a server",

    run: async (client, message, args) => {
        let userid = 1;
        var arr = [];

        axios({
            method: 'get',
            url: `${client.config.panel.panelurl}api/client/servers/${userid}/power`,
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                'Authorization': `Bearer ${client.config.panel.panelapikey}`,
                signal: "delete",
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            }
        }).then(response => {
            const preoutput = response.data.attributes.relationships.servers.data
            arr.push(...preoutput)
            var clean = arr.map(e => "Deleting: `" + e.attributes.name + "`, Server ID: `" + e.attributes.identifier + "`\n");
            const embed = new Discord.MessageEmbed()
                        .addField('Deleted', clean)
            message.channel.send({ embeds: [embed] }).catch(e => {
                const embed = new Discord.MessageEmbed()
                    .addField('ERROR', 'I think i deleted it go see your page if youre the owner im training')
                    .addField('0', arr.map(e => "`" + e.attributes.identifier + "`"))
                 message.channel.send({ embeds: [embed] });
            });
        }).catch(err => {
            message.channel.send(`Error: ${err}`);
        })
    }
}