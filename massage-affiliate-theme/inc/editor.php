<?php
/**
 * Fonctionnalités spécifiques à l'éditeur WordPress
 */

/**
 * Ajoute des styles personnalisés à l'éditeur
 */
function massage_affiliate_editor_styles() {
    // Ajoute la police Google Fonts à l'éditeur
    $font_url = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    add_editor_style(array($font_url, 'style-editor.css'));
    
    // Ajoute des styles personnalisés pour les boutons
    add_theme_support('editor-styles');
    add_editor_style('editor-style.css');
}
add_action('admin_init', 'massage_affiliate_editor_styles');

/**
 * Définit les couleurs personnalisées disponibles dans l'éditeur
 */
function massage_affiliate_editor_color_palette() {
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => esc_html__('Bleu primaire', 'massage-affiliate'),
            'slug'  => 'primary',
            'color' => '#2563eb',
        ),
        array(
            'name'  => esc_html__('Bleu foncé', 'massage-affiliate'),
            'slug'  => 'secondary',
            'color' => '#1d4ed8',
        ),
        array(
            'name'  => esc_html__('Gris foncé', 'massage-affiliate'),
            'slug'  => 'dark-gray',
            'color' => '#1f2937',
        ),
        array(
            'name'  => esc_html__('Gris moyen', 'massage-affiliate'),
            'slug'  => 'medium-gray',
            'color' => '#6b7280',
        ),
        array(
            'name'  => esc_html__('Gris clair', 'massage-affiliate'),
            'slug'  => 'light-gray',
            'color' => '#f3f4f6',
        ),
        array(
            'name'  => esc_html__('Blanc', 'massage-affiliate'),
            'slug'  => 'white',
            'color' => '#ffffff',
        ),
    ));
    
    // Désactive la personnalisation des couleurs
    add_theme_support('disable-custom-colors');
}
add_action('after_setup_theme', 'massage_affiliate_editor_color_palette');

/**
 * Définit les tailles de police personnalisées
 */
function massage_affiliate_editor_font_sizes() {
    add_theme_support('editor-font-sizes', array(
        array(
            'name' => esc_html__('Petit', 'massage-affiliate'),
            'size' => 14,
            'slug' => 'small'
        ),
        array(
            'name' => esc_html__('Normal', 'massage-affiliate'),
            'size' => 16,
            'slug' => 'normal'
        ),
        array(
            'name' => esc_html__('Moyen', 'massage-affiliate'),
            'size' => 20,
            'slug' => 'medium'
        ),
        array(
            'name' => esc_html__('Grand', 'massage-affiliate'),
            'size' => 24,
            'slug' => 'large'
        ),
        array(
            'name' => esc_html__('Très grand', 'massage-affiliate'),
            'size' => 32,
            'slug' => 'x-large'
        ),
        array(
            'name' => esc_html__('Énorme', 'massage-affiliate'),
            'size' => 48,
            'slug' => 'xx-large'
        )
    ));
    
    // Désactive la personnalisation des tailles de police
    add_theme_support('disable-custom-font-sizes');
}
add_action('after_setup_theme', 'massage_affiliate_editor_font_sizes');

/**
 * Active la prise en charge des blocs larges et pleine largeur
 */
function massage_affiliate_wide_blocks() {
    add_theme_support('align-wide');
}
add_action('after_setup_theme', 'massage_affiliate_wide_blocks');

/**
 * Personnalise l'éditeur avec des styles CSS personnalisés
 */
function massage_affiliate_editor_assets() {
    wp_enqueue_style(
        'massage-affiliate-editor-style',
        get_theme_file_uri('editor-style.css'),
        array(),
        _S_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'massage_affiliate_editor_assets');

/**
 * Ajoute des classes CSS aux blocs dans l'éditeur
 */
function massage_affiliate_block_editor_settings() {
    // Active les styles par défaut pour les blocs
    add_theme_support('wp-block-styles');
    
    // Active les styles d'éditeur
    add_theme_support('editor-styles');
    
    // Charge la feuille de style de l'éditeur
    add_editor_style('style-editor.css');
    
    // Ajoute la prise en charge des embeds réactifs
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'massage_affiliate_block_editor_settings');
