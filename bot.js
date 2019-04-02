const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});




client.on('message', msg => {
  if (msg.content === 'sa') {
    msg.reply('**Selam Hoşgeldin.**                                                          `>`<http://instagram.com/muratsigmaz>` takip etmeyi unutma! ♥');
  }
});

client.on('message', msg => {
  if (msg.content === 'Sa') {
    msg.reply('**Selam Hoşgeldin.**                                                          `>`<http://instagram.com/muratsigmaz>` takip etmeyi unutma! ♥');
  }
});

client.on('message', msg => {
  if (msg.content === 'Selam') {
    msg.reply('**Selam Hoşgeldin.**                                                          `>`<http://instagram.com/muratsigmaz>` takip etmeyi unutma! ♥');
  }
});

client.on('message', msg => {
  if (msg.content === 'Selamlar') {
    msg.reply('**Selam Hoşgeldin.**                                                          `>`<http://instagram.com/muratsigmaz>` takip etmeyi unutma! ♥');
  }
});

client.on('message', msg => {
  if (msg.content === 'SA') {
    msg.reply('**Selam Hoşgeldin.**                                                          `>`<http://instagram.com/muratsigmaz>` takip etmeyi unutma! ♥');
  }
});

client.on('message', msg => {
  if (msg.content === 'sunucu') {
    msg.reply('sen sunucuyu kafana takma biz büyüyoruz bak dalgana genç!');
  }
});

client.on('message', msg => {
  if (msg.content === 'murat') {
    msg.reply('yavaş ol murat derken bile besmele çekmiyorsun sakin bölgeye geç!');
  }
});

client.on('message', msg => {
  if (msg.content === 'link') {
    msg.reply('hayır anlamıyorum napcan linki arkadaşını çağırcaksan tamam ama baskın filan sker atarım!');
  }
});

client.on('message', msg => {
  if (msg.content === 'naber') {
    msg.reply('gelmedi senden bi haber merak ettim öldünmü diye sorcam banane mk!');
  }
});

client.on('message', msg => {
  if (msg.content === '!ban özel') {
    msg.reply('AL BUNU AĞZINA https://media.giphy.com/media/uC9e2ojJn1ZXW/giphy.gif');
  }
});


const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let user = message.author
  let sebep = args.join(" ")
  
  if (!sebep) return message.channel.send(`Bir sebep yazmalısın.`)
  
  db.set(`afk_${user.id}`, sebep)
  message.channel.send(`Artık \`${sebep}\` sebebiyle AFK'sın.`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'afk',
  description: "AFK olmanızı sağlar.",
  usage: 'afk <sebep>'
}

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
