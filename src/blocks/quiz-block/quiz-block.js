 //Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { SelectControl, Button } = wp.components;

registerBlockType( 'chroma-blocks/quiz-block', {
	title: __( 'Quiz Block' ),
	icon: 'editor-help',
	category: 'Chroma',
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		question: {
			type: 'array',
			source: 'children',
			selector: '.cm-quiz-slide-q',
		},
		answers: {
			type: 'array',
			source: 'children',
			selector: '.cm-quiz-slide-ans',
		},
		correct: {
			type: 'string',
			source: 'attribute',
			selector: '.cm-quiz-slide',
			attribute: 'data-correct',
      default: 'a'
		},
		explanation : {
			type: 'array',
			source: 'children',
			selector: '.cm-quiz-slide-exp-s',
		},
	},
	edit: ( props ) => {
			const {
				className,
				attributes: {
					explanation,
					mediaID,
					mediaURL,
					question,
					answers,
					correct,
				},
				setAttributes,
			} = props

			const onSelectImage = ( media ) => {
				setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} )
			}
			const onChangeQuestion = ( value ) => {
				setAttributes( { question: value } )
			}

			const onChangeAnswers = ( value ) => {
				setAttributes( { answers: value } )
			}

			const onChangeExplanation = ( value ) => {
				setAttributes( { explanation: value } )
			}
			const onChangeCorrect = ( value ) => {
				setAttributes( { correct: value } )
			}

			return (
				<div className="cm-quiz-slide">
					<figure className="quiz-image">
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes="image"
							value={ mediaID }
							render={ ( { open } ) => (
								<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
									{ ! mediaID ? __( 'Upload Image', 'gutenberg-examples' ) : <img src={ mediaURL } alt={ __( 'Upload Recipe Image', 'gutenberg-examples' ) } /> }
								</Button>
							) }
						/>
					</figure>
					<span>{ 'Question' }</span>
					<RichText
						tagName="div"
						placeholder={ 'Write the Question' }
						value={ question }
						onChange={ onChangeQuestion }
						className="question"
					/>
					<span>{ 'Answers' }</span>
					<SelectControl
			        label="Correct Answer"
			        value={ correct }
			        options={ [
			            { label: 'A', value: 'a' },
			            { label: 'B', value: 'b' },
			            { label: 'C', value: 'c' },
									{ label: 'D', value: 'd' }
			        ] }
			        onChange={ onChangeCorrect }
			    />
					<RichText
						tagName="ul"
						multiline="li"
						className="cm-quiz-slide-ans"
						placeholder={'Write the Answers'}
						value={ answers }
						onChange={ onChangeAnswers }
					/>

					<span>{ 'Explanation' }</span>
					<RichText
						tagName="div"
						placeholder={ 'Write the Explanation' }
						value={ explanation }
						onChange={ onChangeExplanation }
						className="cm-quiz-explanation"
					/>
				</div>
			);
		},
		save: ( props ) => {
			const {
				className,
				attributes: {
					explanation,
					mediaURL,
					question,
					answers,
					correct,
				},
			} = props;
			return (
				<div className="cm-quiz-slide" data-correct={correct}>
					{
						mediaURL && (
							<img className="quiz-image" src={ mediaURL } />
						)
					}
					<RichText.Content tagName="div" className="cm-quiz-slide-q" value={ question } />
					<RichText.Content tagName="ul" className="cm-quiz-slide-ans" value={ answers  } />
          <div className="cm-quiz-slide-exp">
            <RichText.Content tagName="div" className="cm-quiz-slide-exp-s" value={ explanation } />
          </div>
				</div>
			);
		},
	} );
