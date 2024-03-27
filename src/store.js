const initState = {
  count: wp.data.select('core/editor').getBlocks().filter(e=>e.name === 'chroma-blocks/slider-block').length,
}

//register
wp.data.registerStore('chroma', {
  reducer: reducer,
  selectors: { getSlideCount, getCategories },
  actions: {
    countSlide: countSlide,
    returnCategories: returnCategories,
  }
})
//reducer
function reducer( state = initState, action ) {
  switch (action.type) {
    case 'COUNT_SLIDE':
      state.count = state.count + 1
      break;
    case 'RETURN_CATEGORIES':
      getCategories(state, action.id)
      break;
    default:
      break;
  }
  return state;
}
//actions
function countSlide() {
  return {
    type: 'COUNT_SLIDE',
  }
}
function returnCategories(clientID) {
  return {
    type: 'RETURN_CATEGORIES',
    id: clientID
  }
}

//selectors
function getSlideCount(state, clientId) {
  var slides = wp.data.select('core/editor').getBlocks().filter(e=>e.name === 'chroma-blocks/slider-block').reverse();
  var targetSlide = wp.data.select('core/editor').getBlock(clientId)
  if (targetSlide != null && typeof targetSlide != 'undefined') {
    targetSlide.attributes.slideCount = slides.indexOf(targetSlide) + 1
    targetSlide.attributes.slidesLength = slides.length
  }
  return [
    slides.indexOf(targetSlide) + 1,
    slides.length
  ]
}

const getCategories = (state, clientId) => {
  console.log(state, clientId)
  const categories = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'categories' )
  const targetSlide = wp.data.select('core/editor').getBlock(clientId)
  if (targetSlide != null && typeof targetSlide != 'undefined')
    targetSlide.attributes.isGallery = (categories.indexOf(8699) > -1 ) ? 'true' : 'false'
  return targetSlide.attributes.isGallery
}

///subscriber
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    wp.data.subscribe( function() {
    })
  }
}
