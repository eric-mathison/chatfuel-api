import blockButton from '../../../src/types/buttons/blockButton';

describe('Block Button', () => {
    it('should return an error if block name not provided', () => {
        const response = () => blockButton();

        expect(response).to.throw('Expected a block name parameter');
    });

    it('should return an error if title not provided', () => {
        const response = () => blockButton('Test Block');

        expect(response).to.throw('Expected a title parameter');
    });

    it('should return expected block button', () => {
        const response = blockButton('Test Block', 'Test Title');

        expect(response).to.deep.equal({
            type: 'show_block',
            block_names: ['Test Block'],
            title: 'Test Title',
        });
    });
});
