import DiscordRPC from 'discord-rpc';
import Discord from 'discord.js';
import config from './config.json';
import setting from './setting.json';

const sleep = (msec:number) => new Promise<void>((resolve, reject) => {
    setTimeout(() => { resolve()}, msec);
});

const client = new Discord.Client({
    intents: [ 
        Discord.GatewayIntentBits.Guilds
    ]
});
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

client.once('ready', () => { // BOT Login event
    console.log('login to Discord as BOT with ' + client.user?.username);
    RPC.login({ clientId: setting.applicationId });
});
RPC.once('ready', async () => { // RPC Login event
    console.log('login to Discord as RPC with ' + RPC.user?.username);
    while(1) {
        const guild = await client.guilds.fetch(config.guildId);
        console.log(String(guild.memberCount))

        RPC.setActivity({
            state: setting.status.replace("{total}", String(guild.memberCount)),
            details: setting.details.replace("{total}", String(guild.memberCount)),
            startTimestamp: Number(setting.timeStampStart),
            endTimestamp: Number(setting.timeStampEnd),
            largeImageKey: setting.largeImageKey,
            largeImageText: setting.largeImageText,
            smallImageKey: setting.smallImageKey,
            smallImageText: setting.smallImageText,
            instance: undefined,
            partyId: undefined,
            partySize: Number(setting.partySize.replace("{total}", String(guild.memberCount))),
            partyMax: Number(setting.partyMax.replace("{total}", String(guild.memberCount))),
            matchSecret: undefined,
            spectateSecret: undefined,
            joinSecret: undefined,
            buttons: [
                {
                    label: setting.button1Label.replace("{total}", String(guild.memberCount)),
                    url: setting.button1URL
                },
                {
                    label: setting.button2Label.replace("{total}", String(guild.memberCount)),
                    url: setting.button2URL
                }
            ]
        })

        await sleep(config.interval * 1000);
    }
});

client.login(config.botToken);
