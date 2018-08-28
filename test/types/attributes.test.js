import attributes from '../../src/types/attributes';

describe('Set Attributes', () => {
    it('should return an error if no attribute provided', () => {
        const response = () => attributes();

        expect(response).to.throw('Expected an attribute parameter');
    });

    it('should return an attribute and json button', () => {
        const attr = {
            start: 'yes',
            end: 'no',
        };

        const response = attributes(attr, 'json', 'json button', 'https://test.com/test');

        expect(response).to.deep.equal({
            set_attributes: {
                start: 'yes',
                end: 'no',
            },
            type: 'json_plugin_url',
            url: 'https://test.com/test',
            title: 'json button',
        });
    });

    it('should return an attribute and block button', () => {
        const attr = {
            start: 'yes',
            end: 'no',
        };

        const response = attributes(attr, 'block', 'block button', ['Block 1']);

        expect(response).to.deep.equal({
            set_attributes: {
                start: 'yes',
                end: 'no',
            },
            type: 'show_block',
            block_names: ['Block 1'],
            title: 'block button',
        });
    });

    it('should return some attributes', () => {
        const attr = {
            start: 'yes',
            end: 'no',
            left: 'no',
            right: 'yes',
        };

        const response = attributes(attr);

        expect(response).to.deep.equal({
            set_attributes: {
                start: 'yes',
                end: 'no',
                left: 'no',
                right: 'yes',
            },
        });
    });
});
