<?php
/**
 * Fonctions utilitaires pour le thème Massage Affiliate
 */

/**
 * Ajoute des classes au body en fonction de la page
 */
function massage_affiliate_body_classes($classes) {
    // Ajoute une classe si la barre d'administration est visible
    if (is_admin_bar_showing()) {
        $classes[] = 'admin-bar-visible';
    }
    
    // Ajoute une classe si c'est la page d'accueil
    if (is_front_page()) {
        $classes[] = 'home-page';
    }
    
    // Ajoute une classe si c'est un article unique
    if (is_singular('post')) {
        $classes[] = 'single-post';
    }
    
    return $classes;
}
add_filter('body_class', 'massage_affiliate_body_classes');

/**
 * Personnalise l'extrait des articles
 */
function massage_affiliate_excerpt_length($length) {
    return 25; // Nombre de mots pour l'extrait
}
add_filter('excerpt_length', 'massage_affiliate_excerpt_length', 999);

function massage_affiliate_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'massage_affiliate_excerpt_more');

/**
 * Ajoute la prise en charge des images mises en avant
 */
function massage_affiliate_theme_support() {
    add_theme_support('post-thumbnails');
    
    // Taille d'image personnalisée pour les miniatures d'articles
    add_image_size('massage-affiliate-thumbnail', 400, 250, true);
    
    // Taille d'image personnalisée pour les bannières
    add_image_size('massage-affiliate-banner', 1200, 400, true);
}
add_action('after_setup_theme', 'massage_affiliate_theme_support');

/**
 * Charge les polices Google
 */
function massage_affiliate_enqueue_google_fonts() {
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null);
}
add_action('wp_enqueue_scripts', 'massage_affiliate_enqueue_google_fonts');

/**
 * Ajoute des scripts et styles personnalisés
 */
function massage_affiliate_scripts() {
    // Style principal
    wp_enqueue_style('massage-affiliate-style', get_stylesheet_uri(), array(), _S_VERSION);
    
    // Script principal
    wp_enqueue_script('massage-affiliate-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), _S_VERSION, true);
    
    // Ajoute des variables JavaScript
    wp_localize_script('massage-affiliate-script', 'massageAffiliateVars', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('massage-affiliate-nonce')
    ));
}
add_action('wp_enqueue_scripts', 'massage_affiliate_scripts');

/**
 * Ajoute des métadonnées SEO de base dans l'en-tête
 */
function massage_affiliate_seo_meta() {
    if (is_singular()) {
        echo '<meta name="description" content="' . wp_strip_all_tags(get_the_excerpt(), true) . '" />' . "\n";
    }
    
    // Balise canonical
    if (is_singular()) {
        echo '<link rel="canonical" href="' . get_permalink() . '" />' . "\n";
    }
}
add_action('wp_head', 'massage_affiliate_seo_meta', 1);

/**
 * Ajoute des balises meta pour les réseaux sociaux (Open Graph et Twitter Cards)
 */
function massage_affiliate_social_meta() {
    if (is_singular()) {
        global $post;
        $post_image = has_post_thumbnail($post->ID) ? wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'large') : '';
        $post_image_url = $post_image ? $post_image[0] : '';
        
        echo '<meta property="og:title" content="' . esc_attr(get_the_title()) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr(wp_strip_all_tags(get_the_excerpt(), true)) . '" />' . "\n";
        echo '<meta property="og:url" content="' . esc_url(get_permalink()) . '" />' . "\n";
        echo '<meta property="og:site_name" content="' . esc_attr(get_bloginfo('name')) . '" />' . "\n";
        echo '<meta property="og:type" content="article" />' . "\n";
        
        if ($post_image_url) {
            echo '<meta property="og:image" content="' . esc_url($post_image_url) . '" />' . "\n";
            echo '<meta name="twitter:image" content="' . esc_url($post_image_url) . '" />' . "\n";
        }
        
        echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr(get_the_title()) . '" />' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr(wp_strip_all_tags(get_the_excerpt(), true)) . '" />' . "\n";
    }
}
add_action('wp_head', 'massage_affiliate_social_meta', 2);

/**
 * Désactive l'édition de fichiers dans l'administration pour des raisons de sécurité
 */
if (!defined('DISALLOW_FILE_EDIT')) {
    define('DISALLOW_FILE_EDIT', true);
}

/**
 * Désactive l'accès à l'éditeur de thème
 */
function massage_affiliate_remove_editor_menu() {
    remove_submenu_page('themes.php', 'theme-editor.php');
}
add_action('admin_init', 'massage_affiliate_remove_editor_menu', 102);

/**
 * Ajoute un message de sécurité dans le pied de page de l'administration
 */
function massage_affiliate_admin_footer() {
    echo '<span id="footer-thankyou">' . sprintf(esc_html__('Merci d\'utiliser le thème %s', 'massage-affiliate'), 'Massage Affiliate') . '</span>';
}
add_filter('admin_footer_text', 'massage_affiliate_admin_footer');
