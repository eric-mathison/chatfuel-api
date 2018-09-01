import url from 'url';
import axios from 'axios';

const validateOptionParameters = (options) => {
    const optionParameters = ['botId', 'blockId', 'token', 'userId'];

    if (!options) {
        throw new Error('Expected options to be passed');
    }

    optionParameters.forEach((parameter) => {
        if (!options[parameter]) {
            throw new Error(`Expected ${parameter} to be passed`);
        }
    });
};

const broadcast = (options) => {
    validateOptionParameters(options);

    const { botId, blockId, token, userId, attributes } = options;

    const broadcastUrl = `https://api.chatfuel.com/bots/${botId}/users/${userId}/send`;

    const query = Object.assign(
        {},
        {
            chatfuel_token: token,
            chatfuel_block_name: blockId,
        },
        attributes
    );

    const chatfuelApiUrl = url.format({
        pathname: broadcastUrl,
        query,
    });

    return axios.post(chatfuelApiUrl);
};

export default broadcast;
