import Chatfuel from '../src/chatfuel';

describe('Messages', () => {
    it('should return an empty object', () => {
        const response = new Chatfuel().render();

        expect(response).to.deep.equal({});
    });

    it('should return one text message', () => {
        const response = new Chatfuel().addText('This is a test message').render();

        expect(response).to.deep.equal({
            messages: [{ text: 'This is a test message' }],
        });
    });

    it('should return two text messages', () => {
        const response = new Chatfuel()
            .addText('This is a test message')
            .addText('This is another test message')
            .render();

        expect(response).to.deep.equal({
            messages: [
                { text: 'This is a test message' },
                { text: 'This is another test message' },
            ],
        });
    });

    it('should return three text messages', () => {
        const response = new Chatfuel()
            .addText('This is a test message')
            .addText('This is another test message')
            .addText('This is a third test message')
            .render();

        expect(response).to.deep.equal({
            messages: [
                { text: 'This is a test message' },
                { text: 'This is another test message' },
                { text: 'This is a third test message' },
            ],
        });
    });

    it('should return an image message', () => {
        const testImage = 'https://test.com/uploads/image.png';
        const response = new Chatfuel().addImage(testImage).render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: testImage,
                        },
                    },
                },
            ],
        });
    });

    it('should return a text message and image message', () => {
        const testImage = 'https://test.com/uploads/image.png';
        const response = new Chatfuel()
            .addText('This is a test text message')
            .addImage(testImage)
            .render();

        expect(response).to.deep.equal({
            messages: [
                { text: 'This is a test text message' },
                {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: testImage,
                        },
                    },
                },
            ],
        });
    });

    it('should return a video message', () => {
        const testVideo = 'https://test.com/uploads/video.mp4';
        const response = new Chatfuel().addVideo(testVideo).render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'video',
                        payload: {
                            url: testVideo,
                        },
                    },
                },
            ],
        });
    });

    it('should return a combination of a text, image, and audio message', () => {
        const testImage = 'https://test.com/uploads/image.png';
        const testAudio = 'https://test.com/uploads/audio.mp3';
        const response = new Chatfuel()
            .addText('This is a test text message')
            .addImage(testImage)
            .addAudio(testAudio)
            .render();

        expect(response).to.deep.equal({
            messages: [
                { text: 'This is a test text message' },
                {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: testImage,
                        },
                    },
                },
                {
                    attachment: {
                        type: 'audio',
                        payload: {
                            url: testAudio,
                        },
                    },
                },
            ],
        });
    });

    it('should return a file message', () => {
        const testFile = 'https://test.com/uploads/file.pdf';
        const response = new Chatfuel().addFile(testFile).render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'file',
                        payload: {
                            url: testFile,
                        },
                    },
                },
            ],
        });
    });

    it('should return a block button', () => {
        const response = new Chatfuel()
            .addButton('block', 'Test Block', 'Test Button')
            .render('button');

        expect(response).to.deep.equal({
            buttons: [
                {
                    type: 'show_block',
                    block_names: ['Test Block'],
                    title: 'Test Button',
                },
            ],
        });
    });

    it('should return a block and url button', () => {
        const testUrl = 'https://test.com/test/';
        const response = new Chatfuel()
            .addButton('block', 'Test Block', 'Block Button')
            .addButton('link', testUrl, 'Url Button')
            .render('button');

        expect(response).to.deep.equal({
            buttons: [
                {
                    type: 'show_block',
                    block_names: ['Test Block'],
                    title: 'Block Button',
                },
                {
                    type: 'web_url',
                    url: testUrl,
                    title: 'Url Button',
                },
            ],
        });
    });

    it('should return a json button', () => {
        const testUrl = 'https://test.com/test/api';
        const response = new Chatfuel().addButton('json', testUrl, 'JSON Button').render('button');

        expect(response).to.deep.equal({
            buttons: [
                {
                    type: 'json_plugin_url',
                    url: testUrl,
                    title: 'JSON Button',
                },
            ],
        });
    });

    it('should return three block buttons', () => {
        const response = new Chatfuel()
            .addButton('block', 'Test Block', 'Test Button')
            .addButton('block', 'Test Block 2', 'Test Button 2')
            .addButton('block', 'Test Block 3', 'Test Button 3')
            .addButton('block', 'Test Block 4', 'Test Button 4')
            .render('button');

        expect(response).to.deep.equal({
            buttons: [
                {
                    type: 'show_block',
                    block_names: ['Test Block'],
                    title: 'Test Button',
                },
                {
                    type: 'show_block',
                    block_names: ['Test Block 2'],
                    title: 'Test Button 2',
                },
                {
                    type: 'show_block',
                    block_names: ['Test Block 3'],
                    title: 'Test Button 3',
                },
            ],
        });
    });

    it('should return a button block', () => {
        const text = 'This is a test button block';
        const buttons = new Chatfuel()
            .addButton('link', 'https://test.com/test', 'URL Button')
            .addButton('block', 'Test Block', 'Block Button')
            .addButton('block', 'Another Block', 'Block Button 2')
            .render('button');

        const response = new Chatfuel().addButtonBlock(text, buttons).render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'button',
                            text: 'This is a test button block',
                            buttons: [
                                {
                                    type: 'web_url',
                                    url: 'https://test.com/test',
                                    title: 'URL Button',
                                },
                                {
                                    type: 'show_block',
                                    block_names: ['Test Block'],
                                    title: 'Block Button',
                                },
                                {
                                    type: 'show_block',
                                    block_names: ['Another Block'],
                                    title: 'Block Button 2',
                                },
                            ],
                        },
                    },
                },
            ],
        });
    });

    it('should return a gallery message', () => {
        const buttons = new Chatfuel()
            .addButton('link', 'https://test.com/test', 'Button 1')
            .render('button');

        const testImageUrl = 'https://test.com/test/test.png';

        const response = new Chatfuel()
            .addGalleryCard('Test Title', testImageUrl, 'Test Subtitle', buttons)
            .addGallery()
            .render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'generic',
                            image_aspect_ratio: 'square',
                            elements: [
                                {
                                    title: 'Test Title',
                                    image_url: 'https://test.com/test/test.png',
                                    subtitle: 'Test Subtitle',
                                    buttons: [
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 1',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            ],
        });
    });

    it('should return multiple gallery elements in a response', () => {
        const buttons = new Chatfuel()
            .addButton('link', 'https://test.com/test', 'Button 1')
            .addButton('link', 'https://test.com/test', 'Button 2')
            .render('button');

        const testImageUrl = 'https://test.com/test/test.png';

        const response = new Chatfuel()
            .addGalleryCard('Title 1', testImageUrl, 'Subtitle 1', buttons)
            .addGalleryCard('Title 2', testImageUrl, 'Subtitle 2', buttons)
            .addGallery()
            .render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'generic',
                            image_aspect_ratio: 'square',
                            elements: [
                                {
                                    title: 'Title 1',
                                    image_url: testImageUrl,
                                    subtitle: 'Subtitle 1',
                                    buttons: [
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 1',
                                        },
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 2',
                                        },
                                    ],
                                },
                                {
                                    title: 'Title 2',
                                    image_url: testImageUrl,
                                    subtitle: 'Subtitle 2',
                                    buttons: [
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 1',
                                        },
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 2',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            ],
        });
    });

    it('should return a list message', () => {
        const buttons = new Chatfuel()
            .addButton('link', 'https://test.com/test', 'Button 1')
            .render('button');

        const testImageUrl = 'https://test.com/test/test.png';

        const response = new Chatfuel()
            .addListItem('Test Title', testImageUrl, 'Test Subtitle', buttons)
            .addList()
            .render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'list',
                            top_element_style: 'compact',
                            elements: [
                                {
                                    title: 'Test Title',
                                    image_url: 'https://test.com/test/test.png',
                                    subtitle: 'Test Subtitle',
                                    buttons: [
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 1',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            ],
        });
    });

    it('should return multiple list elements in a response', () => {
        const buttons = new Chatfuel()
            .addButton('link', 'https://test.com/test', 'Button 1')
            .addButton('link', 'https://test.com/test', 'Button 2')
            .render('button');

        const listButton = new Chatfuel()
            .addButton('link', 'https://test.com/read', 'Read More')
            .render('button');

        const testImageUrl = 'https://test.com/test/test.png';

        const response = new Chatfuel()
            .addListItem('Title 1', testImageUrl, 'Subtitle 1', buttons)
            .addListItem('Title 2', testImageUrl, 'Subtitle 2', buttons)
            .addListButton(listButton)
            .addList()
            .render();

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'list',
                            top_element_style: 'compact',
                            elements: [
                                {
                                    title: 'Title 1',
                                    image_url: testImageUrl,
                                    subtitle: 'Subtitle 1',
                                    buttons: [
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 1',
                                        },
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 2',
                                        },
                                    ],
                                },
                                {
                                    title: 'Title 2',
                                    image_url: testImageUrl,
                                    subtitle: 'Subtitle 2',
                                    buttons: [
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 1',
                                        },
                                        {
                                            type: 'web_url',
                                            url: 'https://test.com/test',
                                            title: 'Button 2',
                                        },
                                    ],
                                },
                            ],
                            buttons: [
                                {
                                    title: 'Read More',
                                    type: 'web_url',
                                    url: 'https://test.com/read',
                                },
                            ],
                        },
                    },
                },
            ],
        });
    });
});
