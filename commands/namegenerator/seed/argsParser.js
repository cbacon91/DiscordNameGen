const dwarves = ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'];
const elves = ['e', 'elf', 'elfen', 'elven', 'elfish', 'elvish'];
const hobbitses = ['h', 'halfling', 'hobbit', 'kender'];
const orcs = ['o', 'orc', 'ork', 'orcish', 'orkish'];
const gnomes = ['g', 'gnome', 'gnomish'];
const humans = ['human', 'person'];
const allRaces = dwarves.concat(elves, hobbitses, orcs, gnomes, humans);

const males = ['m', 'male', 'man', 'boy'];
const females = ['f', 'female', 'woman', 'girl'];
const genders = males.concat(females);

class ArgsParser {
    
    // todo with the parsing..
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
            races: [], 
            genders: []
        };

        args.forEach((arg) => {
            if(this.isGender(arg)) 
                parsedArgs.genders.push(this.parseGender(arg));
            else if(this.isRace(arg)) 
                parsedArgs.races.push(this.parseRace(arg));
            //simply ignore args that aren't either
        });

        if(!parsedArgs.genders.length)
            parsedArgs.genders.push('male'); //default male; should this be random or should we supply both and let consumer decide?
        if(!parsedArgs.races.length)
            parsedArgs.races.push('human'); //default human; should this be random or should we supply all and let consumer decide?

        return parsedArgs;
    }

    isGender(inArg)
    {
        return genders.includes(inArg);
    }

    parseGender(inArg) {
        return females.includes(inArg) 
            ? 'female' 
            : 'male'; //default to male; should this be random?
    }

    isRace(inArg)
    {
        return allRaces.includes(inArg);
    }

    parseRace(inArg) {
        if(dwarves.includes(inArg))
            return 'dwarf';
        else if(elves.includes(inArg))
            return 'elf';
        else if(hobbitses.includes(inArg))
            return 'halfling';
        else if(orcs.includes(inArg))
            return 'orc';
        else if(gnomes.includes(inArg))
            return 'gnome';
        
        return 'human'; //default to human; should this be random?
    }
}

module.exports = ArgsParser;
