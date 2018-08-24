## LOG A PING

Log-A-PING is a Discord self-bot written in [NodeJS](https://nodejs.org) utilizing the powerful library, [DiscordJS](https://discord.js.org), designed to log any messages that ping the user (this works for **@here** and **@everyone** as well.)

## Requirements

- NodeJS v8.0.0 or newer  
- DiscordJS v11.3 or newer  
- Your token  
  
## How To Get Your Token
1. Use `CMD + Shift + I` or `Option (alt) + Shift + I` **(macOS)** or `Ctrl + Shift + I` **(literally everything else)** to open Developer Tools  
2. Navigate to `Network`
3. Follow the instructions in the image below
![](https://www.hacker-hub.com/images/gettoken.png)   
  
*The token has been redacted from this image for obvious security reasons*

## How To Run

1. Navigate to the `LOG-A-PING` directory  
2. Install the NPM packages using `npm install --production` **(you may need to use** `sudo` **on macOS and Linux)**  
3. Put your token where it says `insert token here` in `./data/config.json`
4. Start the bot by using `node index.js`  
  
If you've done everything correctly, the self-bot should start logging pings in `./data/logs`

## Commands

- `clearping` - Clear all ping alerts from the logs  
- `timeout` - Pause all ping alerts for a short period of time  
  
## Credits

- [DiscordJS](https://discord.js.org)  
- [MomentJS](https://momentjs.com/)
- raizo#0001 for requesting this bot
