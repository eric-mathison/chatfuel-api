import shareButton from '../../../src/types/buttons/shareButton';

describe('Share Button', () => {
    it('should return expected share button', () => {
        const response = shareButton();

        expect(response).to.deep.equal({
            type: 'element_share',
        });
    });
});
