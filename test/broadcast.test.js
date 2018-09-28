import sinon from 'sinon';
import axios from 'axios';
import broadcast from '../src/broadcast';

describe('Chatfuel Broadcast', () => {
    let defaultOptions;
    let stubAxiosPost;

    const defaultBotId = 'defaultBotId';
    const defaultBlockId = 'defaultBotId';
    const defaultToken = 'defaultToken';
    const defaultUserId = 'defaultUserId';
    const defaultTag = 'defaultTag';

    beforeEach(() => {
        defaultOptions = {
            botId: defaultBotId,
            blockId: defaultBlockId,
            token: defaultToken,
            userId: defaultUserId,
            tag: defaultTag,
            attributes: {},
        };

        stubAxiosPost = sinon.stub(axios, 'post');
    });

    afterEach(() => {
        stubAxiosPost.restore();
    });

    describe('Error throwing', () => {
        it('should throw an error if no options passed', () => {
            const response = () => broadcast();

            expect(response).to.throw('Expected options to be passed');
        });

        it('should throw an error if no botId is passed', () => {
            delete defaultOptions.botId;
            const response = () => broadcast(defaultOptions);

            expect(response).to.throw('Expected botId to be passed');
        });

        it('should throw an error if no blockId is passed', () => {
            delete defaultOptions.blockId;
            const response = () => broadcast(defaultOptions);

            expect(response).to.throw('Expected blockId to be passed');
        });
        it('should throw an error if no token is passed', () => {
            delete defaultOptions.token;
            const response = () => broadcast(defaultOptions);

            expect(response).to.throw('Expected token to be passed');
        });
        it('should throw an error if no userId is passed', () => {
            delete defaultOptions.userId;
            const response = () => broadcast(defaultOptions);

            expect(response).to.throw('Expected userId to be passed');
        });
    });

    it('should call expected URL', () => {
        const broadcastURL = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedURL = `${broadcastURL}?chatfuel_token=${defaultToken}&chatfuel_message_tag=${defaultTag}&chatfuel_block_name=${defaultBlockId}`;

        broadcast(defaultOptions);

        expect(stubAxiosPost.getCall(0).args[0]).to.equal(expectedURL);
    });

    it('should append passed attributes to url query', () => {
        const givenAttributes = {
            fakeAttribute1: 'fakeAttribute1',
            fakeAttribute2: 'fakeAttribute2',
        };

        const options = Object.assign({}, defaultOptions, { attributes: givenAttributes });
        const fakeAttributeQuery = 'fakeAttribute1=fakeAttribute1&fakeAttribute2=fakeAttribute2';

        const broadcastURL = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedURL = `${broadcastURL}?chatfuel_token=${defaultToken}&chatfuel_message_tag=${defaultTag}&chatfuel_block_name=${defaultBlockId}&${fakeAttributeQuery}`;

        broadcast(options);

        expect(stubAxiosPost.getCall(0).args[0]).to.equal(expectedURL);
    });
});
