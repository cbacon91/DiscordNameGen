# Juan Charles - the Discord fantasy name generator bot.

Juan Charles is a Discord bot used to generate names for characters in fantasy settings. 

I originally developed it because I'm bad at coming up with names for Dnd characters on the spot when DMing. There have been many town guards named Mike, caravan drivers named Jeff, and most recently, a wealthy mage named Juan Charles, the inspiration for this bot. While there exist a ton of websites online to generate names, I've found that it can be time-consuming to navigate them (click on "fantasy names", click on "gnomes", click on "females"). I always have Discord open during DnD sessions anyway (to use the Tome of Knowledge + 1 or Spellbot, other fantastic discord bots), so having a name generator handy just seemed like a good idea. It's so much easier to type `name gnome female` and have a name generated for me.

This is also my thinly-veiled excuse to learn node and get better at javascript in general. If you have suggestions, comments, or the like, feel free to open issues or send me messages!

# Usage
Tell the bot what race and gender you want, as well as the number of names you want generated. The defaults are `male`, `human`, and one name generated unless specified otherwise, with a maximum of 20 names at a time.

`!name [Race] [Gender] [NameCount]` - the order of the parameters don't matter. Additionally, you can supply multiple of each, and the bot will choose (all-or-nothing style) for duplicates. For example,

`!name Gnome Orc Male Female 20` will generate 20 names of either Gnomish or Orcish descent (determined at random; either all Gnomish or all Orcish), of a random gender. 
`!name male orc female gnome` will produce a similar result set (with either Orc or Gnome being determined, then male or female being determined) - the ordering of the parameters doesn't matter - but it *is* separated by spaces. 

The full list of races and their shortcuts supported are below (these are being copy and pasted from the source, so this *might* be out of date - check `commands/argsparsers/namegeneratorsparser.js` for the current list):

```
const dwarfKeys = ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'];
const elfKeys = ['e', 'elf', 'elfen', 'elven', 'elfish', 'elvish'];
const hobbitsesKeys = ['h', 'halfling', 'hobbit', 'kender', 'half'];
const orcKeys = ['o', 'orc', 'ork', 'orcish', 'orkish'];
const gnomeKeys = ['g', 'gnome', 'gnomish'];
const humanKeys = ['human', 'person', 's', 'n'];
const dragonbornKeys = ['dragon', 'dragonborn', 'dragonborne', 'dragonfolk'];
const tieflingKeys = ['t', 'tielfing', 'fiend', 'abyssal', 'demon', 'daemon', 'devil'];
const virtueKeys = ['virtue', 'sin'];

const males = ['m', 'male', 'man', 'boy'];
const females = ['f', 'female', 'w', 'woman', 'girl'];
```

In addition, you can use `name half-elf` or `name half elf` to generate a list of human names or elf names randomly. Finally, there is one special case: the virtue 'race'. Traditionally, only Tieflings take virtue names, but there's no reason there can't be a character of any race or creed with a virtue name. It's treated as a race - so `name virtue` will just generate any virtuious names.

# Bugs
Check the Issues tab for all known bugs. If you find a new one, feel free to open a new issue.
