import url from 'url';
import axios from 'axios';

const validateOptionParameters = (options) => {
    const optionParameters = ['botId', 'token', 'userId'];

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

    const { botId, blockId, token, userId, tag, attributes } = options;

    const broadcastUrl = `https://api.chatfuel.com/bots/${botId}/users/${userId}/send`;

    const query = Object.assign(
        {},
        {
            chatfuel_token: token,
            chatfuel_message_tag: tag,
            chatfuel_block_name: blockId,
        },
        attributes
    );
    Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

    const chatfuelApiUrl = url.format({
        pathname: broadcastUrl,
        query,
    });

    const headers = {
        'Content-Type': 'application/json',
    };

    return axios.post(chatfuelApiUrl, {}, { headers });
};

export default broadcast;
