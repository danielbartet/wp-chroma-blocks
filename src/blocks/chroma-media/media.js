// Import CSS.
import './style.scss';
import './editor.scss';

import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { Button, Toolbar, Tooltip } from '@wordpress/components';

registerBlockType('chroma-blocks/media-upload', {
    title: 'Chroma Upload',
    icon: 'format-image',
    category: 'Chroma',
    attributes: {
        imgURL: {
            type: 'string',
            source: 'attribute',
            attribute: 'src',
            selector: 'img',
        },
        imgID: {
            type: 'number',
        },
        imgAlt: {
            type: 'string',
            source: 'attribute',
            attribute: 'alt',
            selector: 'img',
        },
        caption: {
            type: 'string',
            source: 'html',
            selector: '.figcaption_link',
        },
        captionLink: {
            type: 'string',
            source: 'attribute',
            attribute: 'href',
            selector: '.figcaption_link',
        },
        alignment: {
            type: 'string',
            default: '',
        },
    },
    edit: (props) => {
        const { attributes: { imgID, imgURL, imgAlt, caption, captionLink, alignment }, className, setAttributes } = props;

        const onSelectImage = (img) => {
            setAttributes({
                imgID: img.id,
                imgURL: img.url,
                imgAlt: img.alt,
            });
        };

        const onChangeAlignment = (newAlignment) => {
            setAttributes({ alignment: newAlignment });
        };

        return (
            <div className={className}>
                <BlockControls>
                    <AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
                </BlockControls>
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={imgID}
                    render={({ open }) => (
                        <Button onClick={open} className={!imgID ? 'button button-large' : 'image-button'}>
                            {!imgID ? 'Upload Image' : <img src={imgURL} alt={imgAlt} />}
                        </Button>
                    )}
                />
                {caption && (
                    <figcaption className="figcaption">
                        <a href={captionLink} className="figcaption_link" target="_blank" rel="noopener noreferrer">
                            {caption}
                        </a>
                    </figcaption>
                )}
            </div>
        );
    },
    save: ({ attributes }) => {
			const { imgURL, imgAlt, caption, captionLink, alignment } = attributes;
			return (
					<div className={`wp-block-chroma-blocks-media-upload image-container ${alignment}`}>
							<figure className={caption ? 'entry-content_figure fig-wcaption' : 'entry-content_figure'}>
									<img src={imgURL} alt={imgAlt} />
									{caption && (
											<figcaption className="figcaption">
													<a href={captionLink} className="figcaption_link" target="_blank" rel="noopener noreferrer">
															{caption}
													</a>
											</figcaption>
									)}
							</figure>
					</div>
			);
		},
});
