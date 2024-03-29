const { createElement, Fragment } = wp.element;
const { registerFormatType, applyFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;

const anchorButton = () => {
  const type = 'advanced/anchor';

  registerFormatType(type, {
    title: 'Anchor',
    tagName: 'a',
    className: null,
    attributes: {
      name: 'name',
    },
    edit({ isActive, value, onChange }) {
      const onToggle = () => {
        console.log(window.getSelection().toString());
        onChange(applyFormat(value, {
          type,
          attributes: {
            name: window.getSelection().toString(),
          },
        }));
      };

      return createElement(
        Fragment,
        null,
        createElement(RichTextToolbarButton, {
          icon: 'admin-links', // 'pressthis' es un icono específico, asegúrate de que es el que quieres usar o cámbialo por uno más adecuado
          title: 'Anchor',
          onClick: onToggle,
          isActive,
        })
      );
    },
  });
};

anchorButton();
