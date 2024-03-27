/**
 * BLOCK: chroma-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'chroma-blocks/cool-quote', {
	title: 'Cool Quote',
	icon: 'format-quote',
	category: 'Chroma',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: '.coolquote',
		},
	},
	edit: props => {
		const { attributes: { content }, focus, className, setFocus } = props;
		const onChangeContent = newContent => {
			props.setAttributes( { content: newContent } );
		};
		return (
      <div class="divquote" className={ ['divquote', className].join(' ') }>
        <RichText
          tagName="span"
          className="coolquote"
          onChange={ onChangeContent }
          value={ content }
          focus={ focus }
          onFocus={ setFocus }
          placeholder={'Cool Quote'}
        />
      </div>
		);
	},
	save: props => {
    return (
      <div className={ ['divquote', props.attributes.className].join(' ') }>
        <span class="coolquote">
          { props.attributes.content }
        </span>
      </div>
  	)
  }
} );
