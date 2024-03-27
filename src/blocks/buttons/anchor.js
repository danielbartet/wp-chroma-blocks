const { createElement, Fragment } = window.wp.element
const { registerFormatType, applyFormat, removeFormat, getActiveFormat  } = window.wp.richText
const {RichTextToolbarButton, RichTextShortcut} = window.wp.editor

const anchorButton = () => {
  const type = 'advanced/anchor'

  registerFormatType(type, {
    title: 'Anchor',
    tagName: 'a',
    className: null,
    attributes: {
      name: 'name',
    },
    edit ({ isActive, value, onChange }) {

      const onToggle = () => {
        console.log(window.getSelection().toString());
        onChange(applyFormat(value, {
        type,
        attributes: {
          name: window.getSelection().toString()
        }
      }))
    }

      return (
        createElement(Fragment, null,
        createElement(RichTextToolbarButton, {
          icon: 'pressthis',
          title: 'Anchor',
          onClick: onToggle,
          isActive,
        })
        )
      )
    }
  })
}
anchorButton()
