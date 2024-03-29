// Import CSS.
import './style.scss';
import './editor.scss';

import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, URLInputButton } from '@wordpress/block-editor';
import { Button, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('chroma-blocks/quiz-block', {
    title: __('Quiz Block', 'chroma-blocks'),
    icon: 'editor-help',
    category: 'chroma',
    attributes: {
        mediaID: {
            type: 'number',
        },
        mediaURL: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'src',
        },
        question: {
            type: 'array',
            source: 'children',
            selector: '.cm-quiz-slide-q',
        },
        answers: {
            type: 'array',
            source: 'children',
            selector: '.cm-quiz-slide-ans',
        },
        correct: {
            type: 'string',
            source: 'attribute',
            selector: '.cm-quiz-slide',
            attribute: 'data-correct',
            default: 'a',
        },
        explanation: {
            type: 'array',
            source: 'children',
            selector: '.cm-quiz-slide-exp-s',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { mediaID, mediaURL, question, answers, correct, explanation } = attributes;

        const onSelectImage = (media) => {
            setAttributes({
                mediaURL: media.url,
                mediaID: media.id,
            });
        };

        return (
            <div className="cm-quiz-slide">
                <figure className="quiz-image">
                    <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={['image']}
                        value={mediaID}
                        render={({ open }) => (
                            <Button className={mediaID ? 'image-button' : 'button button-large'} onClick={open}>
                                {!mediaID ? __('Upload Image', 'chroma-blocks') : <img src={mediaURL} alt={__('Upload Image', 'chroma-blocks')} />}
                            </Button>
                        )}
                    />
                </figure>
                <RichText
                    tagName="div"
                    placeholder={__('Write the Question', 'chroma-blocks')}
                    value={question}
                    onChange={(newQuestion) => setAttributes({ question: newQuestion })}
                    className="cm-quiz-slide-q"
                />
                <SelectControl
                    label={__('Correct Answer', 'chroma-blocks')}
                    value={correct}
                    options={[
                        { label: 'A', value: 'a' },
                        { label: 'B', value: 'b' },
                        { label: 'C', value: 'c' },
                        { label: 'D', value: 'd' },
                    ]}
                    onChange={(newCorrect) => setAttributes({ correct: newCorrect })}
                />
                <RichText
                    tagName="ul"
                    multiline="li"
                    placeholder={__('Write the Answers', 'chroma-blocks')}
                    value={answers}
                    onChange={(newAnswers) => setAttributes({ answers: newAnswers })}
                    className="cm-quiz-slide-ans"
                />
                <RichText
                    tagName="div"
                    placeholder={__('Write the Explanation', 'chroma-blocks')}
                    value={explanation}
                    onChange={(newExplanation) => setAttributes({ explanation: newExplanation })}
                    className="cm-quiz-slide-exp-s"
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        const { mediaURL, question, answers, correct, explanation } = attributes;

        return (
            <div className="cm-quiz-slide" data-correct={correct}>
                {mediaURL && <img className="quiz-image" src={mediaURL} />}
                <RichText.Content tagName="div" className="cm-quiz-slide-q" value={question} />
                <RichText.Content tagName="ul" className="cm-quiz-slide-ans" value={answers} />
                <div className="cm-quiz-slide-exp">
                    <RichText.Content tagName="div" className="cm-quiz-slide-exp-s" value={explanation} />
                </div>
            </div>
        );
    },
});
