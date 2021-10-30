const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: 'show',
  description: 'Bottaki veriyi gösterir!', 
  options: [],
  async execute(client, interaction) {
   var embed = new MessageEmbed()
        .setFooter(
          `© ${client.user.username}... `,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("#5555dd")
        .setDescription(
          `:star: **${
            db.get("linkler").length
           || 0}** tane proje anlık olarak aktif tutuluyor!`)
      return interaction.reply({embeds: [embed]});
  
  }
}