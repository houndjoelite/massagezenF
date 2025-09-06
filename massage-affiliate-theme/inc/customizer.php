<?php
/**
 * Personnalisation du thème via l'API Customizer
 */

function massage_affiliate_customize_register($wp_customize) {
    // Section pour les options du thème
    $wp_customize->add_section('massage_affiliate_theme_options', array(
        'title'    => __('Options du thème', 'massage-affiliate'),
        'priority' => 30,
    ));

    // Paramètre pour le numéro de téléphone
    $wp_customize->add_setting('phone_number', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('phone_number', array(
        'label'    => __('Numéro de téléphone', 'massage-affiliate'),
        'section'  => 'massage_affiliate_theme_options',
        'type'     => 'text',
    ));

    // Paramètre pour l'adresse email
    $wp_customize->add_setting('email_address', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('email_address', array(
        'label'    => __('Adresse email', 'massage-affiliate'),
        'section'  => 'massage_affiliate_theme_options',
        'type'     => 'email',
    ));

    // Paramètre pour les réseaux sociaux
    $wp_customize->add_setting('social_facebook', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('social_facebook', array(
        'label'    => __('Lien Facebook', 'massage-affiliate'),
        'section'  => 'massage_affiliate_theme_options',
        'type'     => 'url',
    ));

    // Section pour le pied de page
    $wp_customize->add_section('massage_affiliate_footer', array(
        'title'    => __('Pied de page', 'massage-affiliate'),
        'priority' => 120,
    ));

    // Paramètre pour le texte du copyright
    $wp_customize->add_setting('footer_copyright', array(
        'default'           => '&copy; ' . date('Y') . ' ' . get_bloginfo('name') . '. Tous droits réservés.',
        'sanitize_callback' => 'wp_kses_post',
    ));

    $wp_customize->add_control('footer_copyright', array(
        'label'    => __('Texte de copyright', 'massage-affiliate'),
        'section'  => 'massage_affiliate_footer',
        'type'     => 'textarea',
    ));
}
add_action('customize_register', 'massage_affiliate_customize_register');
