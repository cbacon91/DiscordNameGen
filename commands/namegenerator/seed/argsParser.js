class ArgsParser {
    
    // todo with the parsing..
    // 1) huge switch blocks are silly. this should be a mapping of some sort
    // 2) currently it parses the race first, and then the gender - this is a little silly. It shouldn't care about the order. 
    //      "Dwarf female" and "female dwarf" should return similar results.
    // 3) only 0, 1, or 2 args are allowed. More than that are just ignored - this is touched on in 2) and 4)
    // 4) Less important, but.. it'd be neat to allow multiple races. ie, if someone puts in "dwarf elf", we should randomly select 
    //      a race and then pick a name. This is cool from the standpoint 
    //      of half-breeds; most people will know they want a half-orc with an orcish name from the get-go, but it's neat to be 
    //      able to select randomly.
    // 5) building on 4), allow "half-elf" and "half-X", assume the other half is human
    // 6) These lists should probably be mapped to a config, external json, or database-like file - hardcoding them feels dirty. 
    // 7) finally, right now the default is 'human male'. Should it be human male, or should it be random? Maybe it could be a 
    //      config setting? human male is good because human names should be applicable to other races (they're generic) and male
    //      characters are generally more common than females (at least in the games I've played.. ), but there's a point to be 
    //      made for a randomization (even if it's soemthing like 85% human 75% male or something .. tbd)

    parseArgs(inArgs) {
        const args = inArgs.split(' ');
        const parsedArgs = {
            race: 'human', 
            gender:'male'
        };

        if(args.length)
            parsedArgs.race = this.parseRace(args[0]);

        if(args.length > 1)
            parsedArgs.gender = this.parseGender(args[1]);

        return parsedArgs;
    }

    parseGender(arg) {
        switch(arg)
        {
            case "f":
            case "female":
            case "w":
            case "woman":
            case "g":
            case "girl":
                return "female";
            default:
                return "male"; 
        }
    }

    parseRace(arg) {
        switch(arg)
        {
            case "d":
            case "dwarf":
            case "dwarfen":
            case "dwarven":
            case "dwarvish":
            case "dwarfish":
                return "dwarf";

            case "e":
            case "elf":
            case "elfen":
            case "elven":
            case "elfish":
            case "elvish":
                return "elf";

            case "h":
            case "halfling":
            case "hobbit":
            case "kender":
                return "halfling";

            case "o":
            case "orc":
            case "ork":
            case "orcish":
            case "orkish":
                return "orc";
            
            case "g":
            case "gnome":
            case "gnomish":
                return "gnome";

            default:
                return "human";
        }
    }
}

module.exports = ArgsParser;
