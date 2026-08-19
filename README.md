# Discord Bot

A TypeScript Discord bot built with [discord.js](https://discord.js.org/). The bot
uses Discord slash commands and automatically loads commands from the `commands`
directory and event handlers from the `events` directory.

## Features

- `/ping` replies with `Pong!`
- `/server` shows the current server name and member count
- `/user` shows the username that ran the command and their server join date
- Centralized interaction handling with an ephemeral error response
- Automatic command and event discovery at startup

## Requirements

- Node.js 18.17 or newer
- A Discord application and bot created in the [Discord Developer Portal](https://discord.com/developers/applications)
- The bot invited to a server with the `applications.commands` and `bot` scopes

## Installation

Clone the repository, open the project directory, and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_test_server_id
```

Keep the bot token private and do not commit the `.env` file.

## Registering Commands

Before starting the bot, register the slash commands in your development server:

```bash
npx tsx deploy-commands.ts
```

Commands are registered as guild commands, so changes should appear quickly in the
server identified by `GUILD_ID`.

## Running the Bot

For development, start the bot with automatic TypeScript reloading:

```bash
npm run dev
```

To create a compiled build and run it:

```bash
npm run build
npm start
```

## Project Structure

```text
commands/               Slash command modules
	utility/              General-purpose commands
events/                 Discord event handlers
deploy-commands.ts      Registers slash commands with Discord
index.ts                Creates the client and loads commands/events
```

## Adding a Command

Create a TypeScript file inside a subdirectory of `commands/` that exports:

1. `data`: a `SlashCommandBuilder` command definition
2. `execute`: an async function that receives a `ChatInputCommandInteraction`

After adding or changing a command, run `npx tsx deploy-commands.ts` again so
Discord receives the updated definition.