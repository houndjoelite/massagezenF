<?php
/**
 * Fonctionnalités pour l'affiliation Amazon
 */

// Raccourci pour afficher un produit Amazon
function amazon_product_shortcode($atts) {
    $atts = shortcode_atts(array(
        'asin' => '',
        'title' => '',
        'price' => '',
        'image' => '',
        'button_text' => 'Voir sur Amazon',
        'tag' => 'massageaffili-21',
    ), $atts, 'amazon_product');

    if (empty($atts['asin'])) return '<p class="error">Erreur : ASIN manquant</p>';
    
    $affiliate_url = 'https://www.amazon.fr/dp/' . esc_attr($atts['asin']) . '/?tag=' . esc_attr($atts['tag']);
    
    ob_start();
    ?>
    <div class="amazon-product">
        <?php if (!empty($atts['image'])) : ?>
            <div class="amazon-product-image">
                <a href="<?php echo esc_url($affiliate_url); ?>" target="_blank" rel="nofollow noopener">
                    <img src="<?php echo esc_url($atts['image']); ?>" alt="<?php echo esc_attr($atts['title']); ?>">
                </a>
            </div>
        <?php endif; ?>
        
        <div class="amazon-product-content">
            <?php if (!empty($atts['title'])) : ?>
                <h3 class="amazon-product-title"><?php echo esc_html($atts['title']); ?></h3>
            <?php endif; ?>
            
            <?php if (!empty($atts['price'])) : ?>
                <div class="amazon-product-price"><?php echo esc_html($atts['price']); ?></div>
            <?php endif; ?>
            
            <a href="<?php echo esc_url($affiliate_url); ?>" class="btn" target="_blank" rel="nofollow noopener">
                <?php echo esc_html($atts['button_text']); ?>
            </a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('amazon_product', 'amazon_product_shortcode');
