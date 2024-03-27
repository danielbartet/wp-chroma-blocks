import './style.scss'
import './editor.scss'

const {  RawHTML } = wp.element
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  BlockAlignmentToolbar,
  Editable,
  MediaUpload,
  URLInput,
} = wp.editor

const { Button, SelectControl } = wp.components;
const {withSelect} = wp.data;

registerBlockType( 'chroma-blocks/product', {
	title: __( 'Product Card' ),
	icon: 'welcome-widgets-menus',
	category: 'Chroma',
	attributes: {
    url: {
      type: 'string',
      source: 'attribute',
      attribute: 'href',
      selector: '.rating_card'
    },
    sub_title: {
      type: 'array',
      source: 'children',
      selector: '.rating_card_middle_title'
    },
    content: {
    	type: 'array',
    	source: 'children',
    	selector: '.rating_card_content',
    },
    listContent: {
    	type: 'array',
    	source: 'children',
    	selector: '.rating_card_list',
    },
    imgURL: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: 'img'
    },
    imgID: {
      type: 'number',
    },
    imgAlt: {
      type: 'string',
      source: 'attribute',
      attribute: 'alt',
      selector: 'img'
    },
    rating: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-rating',
      selector: '.rating_card_score_text'
    },
    stars: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-stars',
      selector: '.rating_card_stars'
    }
	},
	edit: withSelect( (select, props) => {
  })( props => {
		const { attributes: { content, sub_title, imgID, imgURL, imgAlt, url, listContent, rating, stars}, slideCount, focus, className, setFocus, setAttributes, isSelected } = props
    const onSelectImage = img => {
      setAttributes({
          imgID: img.id,
          imgURL: img.url,
          imgAlt: img.alt,
      })
    };
    const onRemoveImage = () => {
      setAttributes({
        imgID: null,
        imgURL: null,
        imgAlt: null,
      });
    }
    const calcStars = (value) => {
      value = parseInt(value)
      var stars = ''
      for(let i = 0; i < value; i++) {
        stars += '★';
      }
      setAttributes( { stars: stars } )
    }
    const onChangeRating = ( value ) => {
      calcStars(value)
      setAttributes( { rating: value } )
    }
		return (
      <div className="rating_card" href={url}>
        <div style={{display: "flex",justifyContent: "space-between",width: "100%",padding: "0px 12px"}}>
          <URLInput
              className="rating_url"
              value={ url }
              onChange={ url => setAttributes( { url } ) }
          />
          <SelectControl
              label="Product Rating"
              value={ rating }
              options={ [
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '3', value: '3' },
                  { label: '4', value: '4' },
                  { label: '5', value: '5' }
              ] }
              onChange={ onChangeRating }
          />
        </div>
        <div className="rating_card_left">
          <figure className="entry-content_figure rating_card_img">
            <MediaUpload
              onSelect={ onSelectImage }
              allowedTypes="image"
              value={ imgID }
              render={ ( { open } ) => (
                <Button className={ imgID ? 'image-button' : 'button button-large' } onClick={ open }>
                  { ! imgID ? 'Upload Image': <img src={ imgURL } alt={ imgAlt } /> }
                </Button>
              ) }
            />
          </figure>
          <div class="rating_card_stars rating" data-stars={stars}>{stars}</div>
          <div className="rating_card_score">
            <div className="rating_card_score_text" data-rating={rating}>{rating}/5</div>
          </div>
        </div>
        <div className="rating_card_middle">
          <span>Insert Title Below</span>
          <RichText
            tagName="h2"
            className="rating_card_middle_title"
            value={ sub_title }
            onChange={ ( value ) => {
              setAttributes( { sub_title: value } )
            } }
            />
          <span>Insert Description Below</span>
          <RichText
            tagName="div"
            multiline="p"
            className="rating_card_content"
            value={ content }
            onChange={ ( value ) => {
              setAttributes( { content: value } )
            } }
          />
        </div>
        <div className="rating_card_right">
          <RichText
            tagName="ul"
            multiline="li"
            className="rating_card_list"
            value={ listContent }
            onChange={ ( value ) => {
              setAttributes( { listContent: value } )
            } }
            />
        </div>
        <div className="rating_card_shop">Buy</div>
      </div>
		);
	}),
	save: props => {
    const {content, sub_title, imgID, imgURL, imgAlt, url, listContent, rating, stars} = props.attributes;
    return (
      <a className="rating_card" href={url}>
        <div className="rating_card_left">
          <figure className="entry-content_figure">
            <img src={ imgURL } alt={ imgAlt } />
          </figure>
          <div class="rating_card_stars rating" data-stars={stars}>{stars}</div>
          <div className="rating_card_score">
            <div className="rating_card_score_text" data-rating={rating}>{rating}/5</div>
          </div>
        </div>
        <div className="rating_card_middle">
          <RichText.Content tagName="h2" className="rating_card_middle_title" value={ sub_title } />
          <RichText.Content tagName="div" className="rating_card_content" value={ content } />
        </div>
        <div className="rating_card_right">
          <RichText.Content tagName="ul" multiline="li" className="rating_card_list" value={ listContent } />
        </div>
        <button className="rating_card_shop">Buy</button>
      </a>
  	)
  }
} );
