import './style.scss'
import './editor.scss'

const { RawHTML } = wp.element
const { __ } = wp.i18n
const { registerBlockType, createBlock } = wp.blocks
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  BlockAlignmentToolbar,
  Editable,
  MediaUpload,
  InnerBlocks,
} = wp.editor
const { Button, Next } = wp.components;
const {withSelect} = wp.data;


const TEMPLATE = [
  ['chroma-blocks/media-upload'],
]

registerBlockType( 'chroma-blocks/slider-block', {
	title: __( 'Slider Block' ),
	icon: 'images-alt',
	category: 'Chroma',
	attributes: {
    clientId: 1,
    sub_title: {
      type: 'array',
      source: 'children',
      selector: '.sb_h2'
    },
		content: {
			type: 'array',
			source: 'children',
			selector: '.sb_p',
		},
    slideCount: {
      source: 'attribute',
      selector: '.sb_bubble',
      attribute: 'data-slide-count',
      default: 1
    },
    slidesLength: {
      source: 'attribute',
      selector: '.sb',
      attribute: 'data-slides-length',
      default: 0
    },
    categories: {
      source: 'attribute',
      selector: '.sb',
      attribute: 'data-categories',
      default: ''
    },
    isGallery: {
      source: 'attribute',
      selector: '.sb',
      attribute: 'data-gallery',
      default: 'false'
    }
	},
	edit: withSelect( (select, props) => {
    const categories = select( 'core/editor' ).getEditedPostAttribute( 'categories' ),
        slideInfo = select('chroma').getSlideCount(props.clientId)
    return {
      slideCount: slideInfo[0],
      slidesLength: slideInfo[1],
      isGallery: (select( 'core/editor' ).getEditedPostAttribute( 'categories' ).indexOf(8699) > -1 ) ? 'true' : 'false',
      categories: select( 'core/editor' ).getEditedPostAttribute( 'categories' ).join("")
    }
  })( props => {
		const { attributes: { content, sub_title }, clientId, slideCount, slidesLength, focus, className, setFocus, setAttributes, isSelected, categories, isGallery } = props
    console.log(isGallery)
    const onChangeSlideText = ( value ) => {
      setAttributes( { content: value } )
    }
    const ALLOWED_BLOCKS = ['chroma-blocks/media-upload', 'core/image', 'core/paragraph', 'core/list', 'core/table', 'core/button', 'core/classic-block']
    wp.data.dispatch('chroma').countSlide()
    wp.data.dispatch('chroma').returnCategories(clientId)
		return (
      <div className={'sb'} data-slides-length={slidesLength} data-categories={categories} data-gallery={isGallery}>
        <div data-slide-count={slideCount} className="sb_bubble"></div>
        <RichText
          tagName="h2"
          className="sb_h2"
          onChange={ (newTitle) => { console.log(createBlock( 'core/list', {
          						values: `<li>check</li>`,
          					} )); props.setAttributes( { sub_title: newTitle } )} }
          value={ sub_title }
          focus={ focus }
          onFocus={ setFocus }
          placeholder={'Slide Title'}
        />
        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE}/>
      </div>
		);
	}),
	save: props => {
    const { slideCount, slidesLength, sub_title, imgURL, imgAlt, content, caption, captionLink, categories, isGallery } = props.attributes;
    return (
      <React.Fragment>
        {
          (isGallery === 'true' && slideCount === slidesLength)
          ?
            <RawHTML>
              { '<!--nextpage-->' }
            </RawHTML>
          : null
        }
        <div className='sb' data-slides-length={slidesLength} data-categories={categories} data-gallery={isGallery}>
          <div data-slide-count={slideCount} className="sb_bubble"></div>
          <RichText.Content tagName="h2" className="sb_h2" value={ sub_title } />
          <InnerBlocks.Content />
        </div>
        {
          (isGallery === 'true')
            ?
              <RawHTML>
                { '<!--nextpage-->' }
              </RawHTML>
            : null
        }
        {
          (isGallery === 'true' && slideCount == 1)
          ?
            <RawHTML>
              { '<!--nextpage-->' }
            </RawHTML>
          : null
        }
      </React.Fragment>
  	)
  }
} );
