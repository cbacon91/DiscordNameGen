const NEWLINE = require('os').EOL;

class JsonSeedRepository {
    getSeedData(args) {
        const seedData = {
            seeds: [],
            message: '',
            error: ''
        };
        try 
        {
            const race = args.races[Math.randomInt(0, args.races.length)];
            const gender = args.genders[Math.randomInt(0, args.genders.length)];

            if(args.races.length > 1)
                seedData.message += `Multiple races specified: generating ${race} names.${NEWLINE}`;
            if(args.genders.length > 1)
                seedData.message += `Multiple genders specified: generating ${gender} names.${NEWLINE}`;

            seedData.seeds = require(`./jsonSeedData/${race}${gender}`);
        }
        catch(e) {
            seedData.error = e; //file not found, out of index, etc
        }

        return seedData;
    }
}

module.exports = JsonSeedRepository;
