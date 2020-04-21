const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'report',
    category: 'moderation',
    description: ' reports a member',
    usage: '<mention | id>',
    run: async (client,message, args) => {
        if (message.deletable) message.delete();
        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!rMember)
            return message.reply('Пользователь не найден').then(m => m.delete(5000));
        if(rMember.hasPermission('BAN_MEMBERS') || rMember.user.bot)
            return message.reply('Данная команда заблокирована').then(m => m.delete(5000));
        if(!args[1])
            return message.reply('Не указана причина').then(m => m.delete(5000));
        const channel = message.guild.channels.cache.find(channel => channel.name === 'reports')
        if(!channel)
            return message.channel.send('Не найдено').then(m => m.delete(5000));
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor('Варн:', rMember.user.displayAvatarURL())
            .setDescription(stripIndents`**> Пользователь: ${rMember}**
            **> Кем: ${message.member}** Место: ${message.channel}**
            ** Причина: ${args.slice(1).join(' ')}`)

        return channel.send(embed);
    }
}