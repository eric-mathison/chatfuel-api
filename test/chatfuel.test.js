import Chatfuel from '../src/chatfuel';

describe('Messages', () => {
    it('should return an empty object', () => {
        const response = new Chatfuel().render();

        expect(response).to.deep.equal({});
    });

    describe('Text Messages', () => {
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
    });

    describe('Image Messages', () => {
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
    });

    describe('Video Messages', () => {
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
    });

    describe('Video Messages', () => {
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
    });

    describe('Button Messages', () => {
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
                        messenger_extensions: false,
                    },
                ],
            });
        });

        it('should return a json button', () => {
            const testUrl = 'https://test.com/test/api';
            const response = new Chatfuel()
                .addButton('json', testUrl, 'JSON Button')
                .render('button');

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

        it('should return a call button', () => {
            const phoneNumber = '+12342345555';
            const response = new Chatfuel()
                .addButton('call', phoneNumber, 'Call Button')
                .render('button');

            expect(response).to.deep.equal({
                buttons: [
                    {
                        type: 'phone_number',
                        phone_number: '+12342345555',
                        title: 'Call Button',
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
                                        messenger_extensions: false,
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
    });

    describe('Gallery Messages', () => {
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
                                                messenger_extensions: false,
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
                                                messenger_extensions: false,
                                            },
                                            {
                                                type: 'web_url',
                                                url: 'https://test.com/test',
                                                title: 'Button 2',
                                                messenger_extensions: false,
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
                                                messenger_extensions: false,
                                            },
                                            {
                                                type: 'web_url',
                                                url: 'https://test.com/test',
                                                title: 'Button 2',
                                                messenger_extensions: false,
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
    });

    describe('Quick Reply Messages', () => {
        it('should return two quick reply buttons', () => {
            const response = new Chatfuel()
                .addQuickReply('block', ['Block 1'], 'Block 1')
                .addQuickReply('block', ['Block 2'], 'Block 2')
                .render('qr');

            expect(response).to.deep.equal({
                quick_replies: [
                    {
                        title: 'Block 1',
                        block_names: ['Block 1'],
                    },
                    {
                        title: 'Block 2',
                        block_names: ['Block 2'],
                    },
                ],
            });
        });

        it('should return a text message and three quick reply buttons', () => {
            const qReplies = new Chatfuel()
                .addQuickReply('block', ['Block 1'], 'Block 1')
                .addQuickReply('block', ['Block 2'], 'Block 2')
                .addQuickReply('json', 'https://test.com/test', 'JSON Button')
                .render('qr');

            const response = new Chatfuel()
                .addText('Test text message')
                .addText('Test text message with quick reply', qReplies)
                .render();

            expect(response).to.deep.equal({
                messages: [
                    {
                        text: 'Test text message',
                    },
                    {
                        text: 'Test text message with quick reply',
                        quick_replies: [
                            {
                                title: 'Block 1',
                                block_names: ['Block 1'],
                            },
                            {
                                title: 'Block 2',
                                block_names: ['Block 2'],
                            },
                            {
                                title: 'JSON Button',
                                url: 'https://test.com/test',
                                type: 'json_plugin_url',
                            },
                        ],
                    },
                ],
            });
        });

        it('should return an image attachment message and two quick reply buttons', () => {
            const qReplies = new Chatfuel()
                .addQuickReply('json', 'https://test.com/test?a=yes', 'JSON Yes Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .render('qr');

            const response = new Chatfuel()
                .addImage('https://test.com/test.png', qReplies)
                .render();

            expect(response).to.deep.equal({
                messages: [
                    {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: 'https://test.com/test.png',
                            },
                        },
                        quick_replies: [
                            {
                                title: 'JSON Yes Button',
                                url: 'https://test.com/test?a=yes',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                        ],
                    },
                ],
            });
        });

        it('should return an text, image, and video attachment message and two quick reply buttons', () => {
            const qReplies = new Chatfuel()
                .addQuickReply('json', 'https://test.com/test?a=yes', 'JSON Yes Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .render('qr');

            const response = new Chatfuel()
                .addText('This is a test')
                .addImage('https://test.com/test.png')
                .addVideo('https://test.com/test.mp4', qReplies)
                .render();

            expect(response).to.deep.equal({
                messages: [
                    {
                        text: 'This is a test',
                    },
                    {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: 'https://test.com/test.png',
                            },
                        },
                    },
                    {
                        attachment: {
                            type: 'video',
                            payload: {
                                url: 'https://test.com/test.mp4',
                            },
                        },
                        quick_replies: [
                            {
                                title: 'JSON Yes Button',
                                url: 'https://test.com/test?a=yes',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                        ],
                    },
                ],
            });
        });

        it('should return a button block and 11 quick reply buttons', () => {
            const text = 'This is a test button block';
            const buttons = new Chatfuel()
                .addButton('link', 'https://test.com/test', 'URL Button')
                .addButton('block', 'Test Block', 'Block Button')
                .addButton('block', 'Another Block', 'Block Button 2')
                .render('button');

            const qReplies = new Chatfuel()
                .addQuickReply('json', 'https://test.com/test?a=yes', 'JSON Yes Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
                .render('qr');

            const response = new Chatfuel().addButtonBlock(text, buttons, qReplies).render();

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
                                        messenger_extensions: false,
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
                        quick_replies: [
                            {
                                title: 'JSON Yes Button',
                                url: 'https://test.com/test?a=yes',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                            {
                                title: 'JSON No Button',
                                url: 'https://test.com/test?a=no',
                                type: 'json_plugin_url',
                            },
                        ],
                    },
                ],
            });
        });
    });

    describe('Set Attributes Messages', () => {
        it('should return an attribute message', () => {
            const attr = {
                test: 'yes',
                demo: 'yes',
                follower: 'no',
            };
            const response = new Chatfuel().addAttributes(attr).render();

            expect(response).to.deep.equal({
                set_attributes: {
                    test: 'yes',
                    demo: 'yes',
                    follower: 'no',
                },
            });
        });

        it('should return an attribute message and json button', () => {
            const attr = {
                test: 'yes',
                demo: 'yes',
                follower: 'no',
            };
            const response = new Chatfuel()
                .addAttributes(attr, 'json', 'json button', 'https://test.com/test')
                .render();

            expect(response).to.deep.equal({
                set_attributes: {
                    test: 'yes',
                    demo: 'yes',
                    follower: 'no',
                },
                type: 'json_plugin_url',
                url: 'https://test.com/test',
                title: 'json button',
            });
        });

        it('should return an attribute message and block button', () => {
            const attr = {
                test: 'yes',
                demo: 'yes',
                follower: 'no',
            };
            const response = new Chatfuel()
                .addAttributes(attr, 'block', 'Block Button', ['Block 1'])
                .render();

            expect(response).to.deep.equal({
                set_attributes: {
                    test: 'yes',
                    demo: 'yes',
                    follower: 'no',
                },
                type: 'show_block',
                block_names: ['Block 1'],
                title: 'Block Button',
            });
        });

        it('should return an attribute with an image message and quick replies', () => {
            const attr = {
                demo: 'yes',
            };

            const qReplies = new Chatfuel()
                .addQuickReply('block', ['Block 1'], 'Block 1')
                .addQuickReply('block', ['Block 2'], 'Block 2')
                .render('qr');

            const response = new Chatfuel()
                .addAttributes(attr)
                .addImage('https://test.com/test.png', qReplies)
                .render();

            expect(response).to.deep.equal({
                set_attributes: {
                    demo: 'yes',
                },
                messages: [
                    {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: 'https://test.com/test.png',
                            },
                        },
                        quick_replies: [
                            {
                                title: 'Block 1',
                                block_names: ['Block 1'],
                            },
                            {
                                title: 'Block 2',
                                block_names: ['Block 2'],
                            },
                        ],
                    },
                ],
            });
        });
    });

    describe('Redirect to Blocks', () => {
        it('should return a redirect to block message', () => {
            const response = new Chatfuel().addRedirect('block 1', 'block 2').render();

            expect(response).to.deep.equal({
                redirect_to_blocks: ['block 1', 'block 2'],
            });
        });

        it('should return a set attribute and redirect to block message', () => {
            const attr = {
                demo: 'yes',
            };

            const response = new Chatfuel()
                .addAttributes(attr)
                .addRedirect('block 1')
                .render();

            expect(response).to.deep.equal({
                set_attributes: {
                    demo: 'yes',
                },
                redirect_to_blocks: ['block 1'],
            });
        });
    });
});
