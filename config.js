module.exports = {
    discord: { //discord settings
        authToken: "MzI0OTQ1MDExODYwOTYzMzI5.DCn5Vw.p3Mj90nsijQwYQt3bb8G4nyCKwg" 
    },
    generator: {
        type: "randomSelector", //randomSelector, markovChain, api, etc
        seedSource: "json", //json, mongo, api, etc
    },
    api: { //if api is used for seed or for generating chains, populate the urls
        seedSrc: "",
        generatorSrc: ""
    }
};
