module.exports = {
    name: 'ping',
    category: 'info',
    description: 'ping',
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Отбиваю....`);
        msg.edit(`🏓 Хуяк!`);
    }
}