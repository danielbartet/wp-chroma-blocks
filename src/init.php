<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function chroma_blocks_category( $categories, $post ) {
	error_log('El filtro de categoría de bloques se está ejecutando.');
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'Chroma',
                'title' => 'Chroma',
                'icon'  => 'share-alt',
            ),
        )
    );
}
add_filter('block_categories_all', 'chroma_blocks_category', 10, 2);


function chroma_blocks_assets() {
	// Styles.
	wp_register_style( 'cm-style', __DIR__ . 'dist/blocks.style.build.css'), null,  filemtime( __DIR__  . 'dist/blocks.style.build.css' ));
	wp_enqueue_style('cm-style');
}
add_action( 'enqueue_block_assets', 'chroma_blocks_assets', 100 );


function chroma_blocks_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'chroma_blocks-cgb-block-js', // Handle.
		__DIR__ . '/dist/blocks.build.js', // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime(  __DIR__  . '/dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	wp_enqueue_style(
		'chroma_blocks-cgb-block-editor-css', // Handle.
		__DIR__ . '/dist/blocks.editor.build.css', // Block style CSS. NOTE WE ARE CHANGING THIS TO DEFAULT STYLE
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime(  __DIR__  . '/dist/blocks.editor.build.css' )
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function chroma_blocks_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'chroma_blocks_cgb_editor_assets' );

function chroma_blocks_register_block_type() {
    $blocks = [
        '/blocks/chroma-quote',
        '/blocks/chroma-button',
        '/blocks/chroma-media',
        '/blocks/slider-block',
        '/blocks/quiz-block',
        '/blocks/select-quiz',
        '/blocks/product-card',
    ];

    foreach ( $blocks as $block ) {
        register_block_type_from_metadata( __DIR__ . $block );
    }
}
add_action( 'init', 'chroma_blocks_register_block_type' );
