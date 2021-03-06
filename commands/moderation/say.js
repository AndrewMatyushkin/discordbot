const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    aliases:['bc', 'broadcast'],
    category: 'moderation',
    description: 'bot saying',
    usage: '<input>',
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        if (args.length < 0) return message.reply(`Nothing to say?`).then(m => m.delete(5000));
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#aaaaaa" : message.guild.me.displayHexColor;
        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" :  roleColor)
                .setTimestamp()
                .setAuthor('', client.user.displayAvatarURL());
                //.setImage(client.user.displayAvatarURL())
                //.setAuthor(message.author.username, message.author.displayAvatarURL());
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }

}