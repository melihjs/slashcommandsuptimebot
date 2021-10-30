const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const fetch = require('node-fetch');

module.exports = {
  name: 'link-ekle',
  description: 'Bota uptime linki eklersin!', 
  options: [
    {
      name: "link",
      required: true,
      description: "Link gir.",
      type: 3
    }
  ],
  async execute(client, interaction) {
    var link = interaction.options.getString('link');
    fetch(link).then(() => {
      if (db.get("linkler").map(Revenge => Revenge.url).includes(link)) {
        return interaction.reply(":x: Projeniz Sistemde Zaten Var.")
      } else {
        interaction.reply(":white_check_mark: Projeniz sisteme eklendi.")
          db.push("linkler", { url: link, owner: interaction.user.id });
          db.push(`Projesis_${interaction.user.id}`, link);
      }
    }).catch(e => {
      return interaction.reply(":x: Lütfen mutlak bir url girin.")
    });
  }
}