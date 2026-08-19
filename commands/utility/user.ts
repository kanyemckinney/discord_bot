import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.');

export async function execute(interaction: ChatInputCommandInteraction) {
    const joinedAt = interaction.member && 'joinedAt' in interaction.member 
        ? interaction.member.joinedAt 
        : 'Unknown';
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${joinedAt}.`);
}
