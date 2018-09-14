import { RichEmbed } from "discord.js";

export class CommandData {
  name: string = '';
  usage: string = '';
  description: string = '';
  detailedHelp?: RichEmbed
}