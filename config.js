module.exports = {
  discord: { // discord settings
    authToken: '',
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
