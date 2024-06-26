<?php
/**
 * Plugin Name:       Chroma Blocks
 * Description:       Custom blocks for the gutenberg editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Daniel Bartet
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       chroma-blocks
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
// function chroma_blocks_v2_chroma_blocks_v2_block_init() {
// 	register_block_type( __DIR__ . '/build' );
// }
// add_action( 'init', 'chroma_blocks_v2_chroma_blocks_v2_block_init' );
define( 'PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'PLUGIN_URL', plugin_dir_url(__FILE__) );
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
