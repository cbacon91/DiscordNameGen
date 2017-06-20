# Juan Charles - the Discord fantasy name generator bot.

Hi! My name is Chris, and I'm bad at coming up with names for DnD NPCS on the spot. There have been many town guards named Mike, caravan drivers named Jeff, and most recently, a wealthy mage named Juan Charles, the inspiration for this bot. While there exist a ton of websites online to generate names, I've found that it can be time-consuming to navigate them (click on "fantasy names", click on "gnomes", click on "females"). I always have Discord open during DnD sessions anyway (to use the Tome of Knowledge + 1 or Spellbot), so having a name generator handy just seemed like a good idea. It's so much easier to type `name gnome female` (or `name g f` for the brave) and have a name generated for me.

This is also my thinly-veiled excuse to learn node and get better at javascript in general. If you have suggestions, comments, or the like, feel free to open issues or send me messages!

# Usage
Right now, the functionality is pretty rudimentary - tell the bot what race and gender you want, as well as the number of names you want generated.

`!name [Race] [Gender] [NameCount]` - the order of the parameters don't matter. Additionally, you can supply multiple of each. For example,

`!name Gnome Orc Male Female 20` will generate 20 names of either Gnomish or Orcish descent (determined at random), of a random gender. 
`!name male orc female gnome` will produce a similar result set - the ordering of the parameters doesn't matter - but it *is* separated by spaces. 

The full list of races and their shortcuts supported are below:
```
dwarves = ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'];
elves = ['e', 'elf', 'elfen', 'elven', 'elfish', 'elvish'];
hobbitses = ['h', 'halfling', 'hobbit', 'kender'];
orcs = ['o', 'orc', 'ork', 'orcish', 'orkish'];
gnomes = ['g', 'gnome', 'gnomish'];
humans = ['human', 'person', 'half'];
```
```
males = ['m', 'male', 'man', 'boy'];
females = ['f', 'female', 'woman', 'girl'];
```

# Bugs
Check the Issues tab for all known bugs. If you find a new one, feel free to open a new issue.
