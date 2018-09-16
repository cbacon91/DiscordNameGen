import { CommandBase } from './commandBase';
import { Message, RichEmbed } from 'discord.js';
import { Logger } from '../logger';
import { Field } from './models/field';

const cmdTitle = 'help';
export class ChangelogCommand extends CommandBase {
  constructor(
    logger: Logger
  ) {

    super(logger, {
      name: cmdTitle,
      usage: 'changelog',
      description: 'Lists significant changes made in the most recent update.',
    });
  }

  async run(message: Message, _args: string): Promise<any> {
    const v4_0_0: Field[] = [];
    v4_0_0.push({
      name: '${prefix}help prettier/more helpful',
      value: 'The `${prefix}help` command has been made a ton prettier. The help listed for the `${prefix}name` command is also hopefully more helpful in what is allowed. In addition, you can now use `${prefix}help name` for _significantly_ better instructions, albeit at the cost of being somewhat wordy.'
    });

    v4_0_0.push({
      name: '${prefix}name and arguments missing',
      value: 'Using `%{prefix}name` without the gender or race specified by the user will select at random instead of defaulting to male and human respectively. The developer believe that random is more useful than human names (which are also, in his opinion, generally the worst). It also seems like people tended to use `${prefix}name human elf gnome orc [...]` to generate just a random name from the get-go, so this should make that process a bit less ridiculous.'
    });
  
    v4_0_0.push({
      name: '${prefix}changelog added',
      value: 'The `$[prefix}changelog` command was added. It shows this information.'
    });
  
    v4_0_0.push({
      name: '${prefix}name lag?',
      value: 'The `${prefix}name` command now pulls names from the internet instead of locally, so it might be a tad slower. This should be insignificant and largely unnnoticeable. If it`\'s noticeable and/or an issue, please open an issue at the github link provided in `$[prefix}help`.'
    });
  
    v4_0_0.push({
      name: 'nerd stuff',
      value: 'The rest of the changes are code-specific and not central to user experience.'
    });
  
    v4_0_0.push({
      name: 'typescript',
      value: 'Converted the codebase from javascript to typescript. I generally prefer typescript, and I wanted to refactor the confusing layout of the codebase, and this was as good a time as any. There\'s no webpack or anything, just `tsc` and running the dist file. Probably short-sighted. ¯\\\_(ツ)\_/¯' 
    });

    v4_0_0.push({
      name: 'folder structure',
      value: 'Folder structure is just completely different. It was a nightmare to track stuff down. I don\'t know what I was thinking either. Don\'t @ me.'
    });

    v4_0_0.push({
      name: 'embeds',
      value: 'Added the ability to send embed messages. Embed messages are easier to layout and look a little better. Yes, `sendEmbed` and `send` are kind of redundant and could be done with another `|` and some clever code-writin\'. I wrote it this way explicilty because I\'m lazy. It\'s probably a bad idea to do it this way, but oh well. I\'ll fix it later if it\'s an issue. Still don\'t @ me.'
    });
  
    v4_0_0.push({
      name: 'internet json instead of local',
      value: 'Names come from ${config.api.seedSource} instead of local json files. They otherwise behave the same, but this keeps the local repository a bit less ridiculous. It makes adding new names a much easier change to facilitate than an entire discord bot deploy. This is some scaffolding to make database integration a bit easier.'
    });
    
    return this.sendEmbed(new RichEmbed({
      title: 'v4.0.0 release',
      fields: v4_0_0
    }), message);
  }
}
