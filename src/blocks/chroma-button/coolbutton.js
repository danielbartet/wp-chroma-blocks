import './style.scss'

const { registerBlockType } = wp.blocks;
const { URLInput } = wp.editor;
const { Fragment } = wp.element;
const { IconButton, Tooltip, TextControl } = wp.components;


registerBlockType( 'chroma-blocks/chroma-button', {
	title: 'Chroma Button',
	icon: 'warning',
	category: 'Chroma',
	attributes: {
    text: {
      type: 'string',
      source: 'text',
      selector: 'a',
    },
    url: {
      type: 'string',
      source: 'attribute',
      attribute: 'href',
      selector: 'a',
    },
	},
	edit: props => {
    const { attributes: { text, url },
        className, isSelected, setAttributes } = props;
    return (
        <div className={ className }>
            { isSelected ? (

              <Fragment>
                <TextControl
                    label='Button Text'
                    value={ text }
                    onChange={ text => setAttributes( { text } ) }
                />
                <form
                  className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
                  onSubmit={ event => event.preventDefault() }
                >
                  <Tooltip text="Add Link">
                    <span>Add Link</span>
                  </Tooltip>
                  <URLInput
                      className="url"
                      value={ url }
                      onChange={ url => setAttributes( { url } ) }
                  />
                  <IconButton
                      icon="editor-break"
                      label='Apply'
                      type="submit"
                  />
                </form>
              </Fragment>

            ) : (

              <a className="cm_btn box-shadow-default" href={ url }>
                  { text || 'Edit link' }
              </a>

            )}

        </div>
    );
  },
	save: props => {
    return (
      <a href={props.attributes.url} className='cm_btn box-shadow-default'>
          { props.attributes.text }
      </a>
  	)
  }
} );
