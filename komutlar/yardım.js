const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'yardım',
  description: 'Botun yardım menüsünü atar!', 
  options: [],
  async execute(client, interaction) {

 const embed = new MessageEmbed()
    .setTitle(`${client.user.tag}'s help menu!`)
    .setDescription(`:ping_pong: Toplam komut sayısı: **${client.command.size}**`)
    .addField('Tüm Komutlar (4)', '`link-ekle`, `show`, `yardım`')
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
    .setColor('#5555dd');
    return interaction.reply({embeds: [embed]});
  }
}