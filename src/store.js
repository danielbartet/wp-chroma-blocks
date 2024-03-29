// store.js
const { registerStore, select, dispatch } = wp.data;
const { subscribe } = wp.data;

const DEFAULT_STATE = {
  count: 0,
  categories: [],
};

const actions = {
  countSlide() {
    return {
      type: 'COUNT_SLIDE',
    };
  },
  returnCategories(categories) {
    return {
      type: 'RETURN_CATEGORIES',
      categories,
    };
  },
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'COUNT_SLIDE':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'RETURN_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };
    default:
      return state;
  }
};

const selectors = {
  getSlideCount(state) {
    return state.count;
  },
  getCategories(state) {
    return state.categories;
  },
};

registerStore('chroma', {
  reducer,
  actions,
  selectors,
});

document.addEventListener('DOMContentLoaded', () => {
  const blocks = select('core/block-editor').getBlocks();
  const sliderBlocksCount = blocks.filter(block => block.name === 'chroma-blocks/slider-block').length;
  dispatch('chroma').countSlide(sliderBlocksCount);

  const categories = select('core').getEntityRecords('taxonomy', 'category');
  if (categories) {
    dispatch('chroma').returnCategories(categories.map(category => category.id));
  }
});
