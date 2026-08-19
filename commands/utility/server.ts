import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder().setName("server").setDescription("Provides information about the server.");

export async function execute(interaction: ChatInputCommandInteraction) {
    const name = interaction.guild ? interaction.guild.name : 'Unknown';
    const memberCount = interaction.guild ? interaction.guild.memberCount : "Unknown";

    await interaction.reply(
        `This server is ${name} and has ${memberCount} members.`,
    );
}
