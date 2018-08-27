import quickReply from '../../src/types/quickReply';

describe('Quick Reply Messages', () => {
    it('should return an error if no type provided', () => {
        const response = () => quickReply();

        expect(response).to.throw('Expected a type parameter');
    });

    it('should return an error if no attribute provided', () => {
        const response = () => quickReply('type');

        expect(response).to.throw('Expected an attribute parameter');
    });

    it('should return an error if no title provided', () => {
        const response = () => quickReply('type', 'attr');

        expect(response).to.throw('Expected a title parameter');
    });

    it('should return a quick reply block message', () => {
        const blocks = ['Block 1', 'Block 2'];
        const response = quickReply('block', blocks, 'Block Reply');

        expect(response).to.deep.equal({
            title: 'Block Reply',
            block_names: ['Block 1', 'Block 2'],
        });
    });

    it('should return a quick reply json message', () => {
        const url = 'https://test.com/test/json';
        const response = quickReply('json', url, 'JSON Reply');

        expect(response).to.deep.equal({
            title: 'JSON Reply',
            url: 'https://test.com/test/json',
            type: 'json_plugin_url',
        });
    });
});
