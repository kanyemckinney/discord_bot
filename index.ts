// Import the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import dotenv from 'dotenv';
import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, any>;
  }
}

dotenv.config();
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.


client.commands = new Collection();

//Grab all the command folders from the commands directory 
const foldersPath = join(process.cwd(), 'commands');
const commandFolders = readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = await import(pathToFileURL(filePath).href);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = join(process.cwd(), 'events');
const eventFiles = readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));
for (const file of eventFiles) {
	const filePath = join(eventsPath, file);
	const event = await import(pathToFileURL(filePath).href);
	if (event.once) {
		client.once(event.name, (...args: unknown[]) => event.execute(...args));
	} else {
		client.on(event.name, (...args: unknown[]) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);