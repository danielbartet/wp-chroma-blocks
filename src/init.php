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
	error_log('################# El filtro de categoría de bloques se está ejecutando.');
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
	wp_register_style( 'cm-style', plugins_url( '../dist/blocks.style.build.css', __FILE__ ), null,  filemtime( __DIR__  . 'dist/blocks.style.build.css' ));
	wp_enqueue_style('cm-style');
}
add_action( 'enqueue_block_assets', 'chroma_blocks_assets', 100 );


function chroma_blocks_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'chroma_blocks-cgb-block-js', // Handle.
		plugins_url( '../dist/blocks.build.js', __FILE__ ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '../dist/blocks.build.js', __FILE__ ) ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	wp_enqueue_style(
		'chroma_blocks-cgb-block-editor-css', // Handle.
		plugins_url( '../dist/blocks.editor.build.css', __FILE__ ), // Block style CSS. NOTE WE ARE CHANGING THIS TO DEFAULT STYLE
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime(  plugins_url( '../dist/blocks.editor.build.css', __FILE__ ) )
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

function chroma_blocks_register_blocks() {
    $plugin_dir_url = plugin_dir_url(__FILE__);
    $script_asset_path = plugin_dir_path(__FILE__) . 'dist/blocks.build.asset.php';

    if (!file_exists($script_asset_path)) {
        error_log('Archivo .asset.php no encontrado: ' . $script_asset_path);
        return;
    }

    $index_js = 'dist/blocks.build.js';
    $script_asset = require($script_asset_path);
    wp_register_script(
        'chroma-blocks-editor-script',
        $plugin_dir_url . $index_js,
        $script_asset['dependencies'],
        $script_asset['version']
    );

    $editor_css = 'dist/blocks.editor.build.css';
    wp_register_style(
        'chroma-blocks-editor-style',
        $plugin_dir_url . $editor_css,
        array(),
        filemtime(plugin_dir_path(__FILE__) . $editor_css)
    );

    $style_css = 'dist/blocks.style.build.css';
    wp_register_style(
        'chroma-blocks-style',
        $plugin_dir_url . $style_css,
        array(),
        filemtime(plugin_dir_path(__FILE__) . $style_css)
    );

    $block_names = [
        'chroma-blocks/chroma-quote',
        'chroma-blocks/chroma-button',
        'chroma-blocks/chroma-media',
		'chroma-blocks/slider-block',
		'chroma-blocks/quiz-block',
		'chroma-blocks/select-quiz',
		'chroma-blocks/product-card',
    ];

    foreach ($block_names as $block_name) {
        register_block_type($block_name, array(
            'editor_script' => 'chroma-blocks-editor-script',
            'editor_style' => 'chroma-blocks-editor-style',
            'style' => 'chroma-blocks-style',
        ));
    }
}
add_action('init', 'chroma_blocks_register_blocks');

