 //Import CSS.
 import './style.scss';
 import './editor.scss';
import React from 'react';
import Select from 'react-select';
import { registerBlockType } from '@wordpress/blocks';

const { __ } = wp.i18n
const { apiFetch } = wp
const { registerStore, withSelect } = wp.data
const { Spinner } = wp.components

//build store
const actions = {
  setQuiz( quiz ) {
    return {
      type: 'SET_QUIZ',
      quiz,
    }
  },
  receiveQuiz( path ) {
    return {
      type: 'RECEIVE_QUIZ',
      path
    }
  },
}
const store = registerStore('chroma-blocks/select-quiz', {
  reducer( state = { quiz: {} }, action ) {
    switch (action.type) {
      case 'SET_QUIZ':
        return {
          ...state,
          quiz: action.quiz
        }
    }
    return state
  },
  actions,
  selectors: {
    receiveQuiz(state) {
      const {quiz} = state
      return actions.setQuiz(quiz)
    }
  },
  controls: {
    RECEIVE_QUIZ(action) {
      return apiFetch( { path: action.path })
    },
  },
  resolvers: {
    * receiveQuiz( state ) {
      const quiz = yield actions.receiveQuiz('/wp/v2/cmquiz/')
      return actions.setQuiz(quiz)
    }
  }
})


registerBlockType( 'chroma-blocks/select-quiz', {
	title: __( 'Select Quiz' ),
	icon: 'format-video',
	category: 'Chroma',
	attributes: {
    selectedOption: {
      type: 'string',
      default: null,
    },
	},
	edit: withSelect((select) => {
    let quizListJson = select('chroma-blocks/select-quiz').receiveQuiz()
    let quizList = []
    Object.entries(quizListJson).forEach(
      ([key, value]) => {
        if (key == 'quiz') {
          if (typeof value !== 'undefined' && Array.isArray(value)) {
            value.forEach( (subVal, i) => {
              quizList.push( {value: subVal.id, label: subVal.title.rendered} )
            })
          }
        }
      }
    )
    return {
      quiz: quizList,
    }
  })(props => {
    const {
      className,
      attributes: {
        selectedOption,
      },
      quiz,
      setAttributes,
    } = props
    const handleSelectChange = ( selectedOption ) => setAttributes( { selectedOption: JSON.stringify( selectedOption ) } )

    // Verifica si selectedOption es null o undefined antes de intentar parsearlo
    const parsedSelectedOption = selectedOption ? JSON.parse(selectedOption) : null;

    return (
      <div>
        <span>Select a Quiz</span>
        <Select
          name='cmquiz-select'
          value={ parsedSelectedOption }
          onChange={ handleSelectChange }
          options={quiz}
        />
        <div className="cm_quiz_placeholder">
          <span>{(parsedSelectedOption) ? parsedSelectedOption.label : ''}</span>
        </div>
      </div>
    );
  }),
  save: ( props ) => {
    const {
      className,
      attributes: {
        selectedOption
      },
    } = props;

    // Verifica si selectedOption es null o undefined antes de intentar parsearlo
    const parsedSelectedOption = selectedOption ? JSON.parse(selectedOption) : null;

    return (
      <div id="cm-quiz-loader" data-id={parsedSelectedOption ? parsedSelectedOption.value : ''}>
        <script defer src="/wp-content/plugins/chroma-blocks/src/blocks/select-quiz/quiz-loader.js"></script>
      </div>
    );
  },
	} );
