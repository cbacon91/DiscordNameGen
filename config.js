module.exports = {
  discord: { // discord settings
    authToken: 'Mzg1NDU4OTIzNDY3MDQ2OTEy.DQCCuA.5JMVb6tcS8prJbkj2PqW2dYK5-U',
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
