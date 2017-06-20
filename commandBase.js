class CommandBase {
    constructor(client, cmdData){
		if(!client)
			throw 'Missing client';
		if(!cmdData)
			throw 'Missing CmdData';
		if(!cmdData.name)
			throw 'Missing CmdData.name';

		this.client = client;
		this.name = cmdData.name;
		this.description = cmdData.description;
	}
}

module.exports = CommandBase;
