<?php
/**
 * Massage Affiliate Theme functions and definitions
 *
 * @package Massage_Affiliate
 */

if (!defined('_S_VERSION')) {
    define('_S_VERSION', '1.0.0');
}

/**
 * Configuration de base du thème et prise en charge des fonctionnalités WordPress
 */
function massage_affiliate_setup() {
    // Ajout de la balise de titre automatique
    add_theme_support('title-tag');
    
    // Activation des images mises en avant
    add_theme_support('post-thumbnails');
    
    // Activation de la prise en charge du HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Enregistrement des emplacements de menu
    register_nav_menus(
        array(
            'primary' => esc_html__('Menu Principal', 'massage-affiliate'),
            'footer' => esc_html__('Pied de page', 'massage-affiliate'),
        )
    );
    
    // Ajout du support des balises de thème pour le bloc d'éditeur
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_editor_style('style-editor.css');
    
    // Ajout du support des logos personnalisés
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-width'  => true,
        'flex-height' => true,
    ));
    
    // Ajout du support des en-têtes personnalisés
    add_theme_support('custom-header', array(
        'default-image'      => '',
        'default-text-color' => '000000',
        'width'              => 1200,
        'height'             => 400,
        'flex-width'         => true,
        'flex-height'        => true,
    ));
    
    // Ajout du support des arrière-plans personnalisés
    add_theme_support('custom-background', array(
        'default-color' => 'ffffff',
        'default-image' => '',
    ));
}
add_action('after_setup_theme', 'massage_affiliate_setup');

/**
 * Définition de la largeur du contenu
 */
if (!isset($content_width)) {
    $content_width = 1200; /* pixels */
}

/**
 * Enregistrement des zones de widgets
 */
function massage_affiliate_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Barre latérale', 'massage-affiliate'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Ajoutez des widgets ici pour les afficher dans la barre latérale.', 'massage-affiliate'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    // Zone de widgets du pied de page
    register_sidebar(array(
        'name'          => esc_html__('Pied de page - Colonne 1', 'massage-affiliate'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Première colonne du pied de page.', 'massage-affiliate'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Pied de page - Colonne 2', 'massage-affiliate'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Deuxième colonne du pied de page.', 'massage-affiliate'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Pied de page - Colonne 3', 'massage-affiliate'),
        'id'            => 'footer-3',
        'description'   => esc_html__('Troisième colonne du pied de page.', 'massage-affiliate'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'massage_affiliate_widgets_init');

/**
 * Chargement des scripts et styles
 */
function massage_affiliate_scripts() {
    // Styles
    wp_enqueue_style('massage-affiliate-style', get_stylesheet_uri(), array(), _S_VERSION);
    
    // Police Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null);
    
    // Scripts
    wp_enqueue_script('massage-affiliate-navigation', get_template_directory_uri() . '/js/navigation.js', array('jquery'), _S_VERSION, true);
    
    // Script principal
    wp_enqueue_script('massage-affiliate-script', get_template_directory_uri() . '/js/main.js', array('jquery'), _S_VERSION, true);
    
    // Ajout des variables JavaScript
    wp_localize_script('massage-affiliate-script', 'massageAffiliateVars', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('massage-affiliate-nonce')
    ));
    
    // Comment reply
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'massage_affiliate_scripts');

/**
 * Fonctionnalités personnalisées pour l'affiliation Amazon
 */
require get_template_directory() . '/inc/amazon-affiliate.php';

/**
 * Widgets personnalisés
 */
require get_template_directory() . '/inc/widgets.php';

/**
 * Fonctions utilitaires
 */
require get_template_directory() . '/inc/utils.php';

/**
 * Personnalisation du thème
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Fonctionnalités spécifiques à l'éditeur
 */
require get_template_directory() . '/inc/editor.php';

/**
 * Fonctionnalités de sécurité
 */
require get_template_directory() . '/inc/security.php';

/**
 * Fonctionnalités de performance
 */
require get_template_directory() . '/inc/performance.php';
