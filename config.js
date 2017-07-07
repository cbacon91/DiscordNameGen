module.exports = {
  discord: { // discord settings
    authToken: 'MzI0OTQ1MDExODYwOTYzMzI5.DDFSjw.0b26OxCIwKUN60PgG6FOdTeOFZk',
    defaultPrefix: '%',
    devServer: 'https://discord.gg/522cp56',
  },
  generator: {
    type: 'randomSelector', // randomSelector, markovChain, api, etc
    seedSource: 'json', // json, mongo, api, etc
  },
  api: { // if api is used for seed or for generating chains, populate the urls
    seedSrc: '',
    generatorSrc: '',
  },
};
