<?php
/**
 * Widgets personnalisés pour le thème Massage Affiliate
 */

// Enregistrer les zones de widgets
function massage_affiliate_widgets_init() {
    // Barre latérale
    register_sidebar(array(
        'name'          => esc_html__('Barre latérale', 'massage-affiliate'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Ajoutez des widgets ici pour les afficher dans la barre latérale.', 'massage-affiliate'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    // Pied de page - Colonne 1
    register_sidebar(array(
        'name'          => esc_html__('Pied de page - Colonne 1', 'massage-affiliate'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Première colonne du pied de page.', 'massage-affiliate'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));

    // Pied de page - Colonne 2
    register_sidebar(array(
        'name'          => esc_html__('Pied de page - Colonne 2', 'massage-affiliate'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Deuxième colonne du pied de page.', 'massage-affiliate'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));

    // Pied de page - Colonne 3
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

// Widget Produit en vedette
class Massage_Affiliate_Featured_Product_Widget extends WP_Widget {
    public function __construct() {
        parent::__construct(
            'massage_affiliate_featured_product',
            esc_html__('Produit en vedette', 'massage-affiliate'),
            array('description' => esc_html__('Affichez un produit en vedette avec un lien d\'affiliation Amazon.', 'massage-affiliate'))
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        
        $product_url = !empty($instance['product_url']) ? $instance['product_url'] : '';
        $button_text = !empty($instance['button_text']) ? $instance['button_text'] : 'Voir sur Amazon';
        $image_url = !empty($instance['image_url']) ? $instance['image_url'] : '';
        $description = !empty($instance['description']) ? $instance['description'] : '';
        
        ?>
        <div class="featured-product-widget">
            <?php if ($image_url) : ?>
                <div class="featured-product-image">
                    <a href="<?php echo esc_url($product_url); ?>" target="_blank" rel="nofollow noopener">
                        <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($instance['title']); ?>">
                    </a>
                </div>
            <?php endif; ?>
            
            <?php if ($description) : ?>
                <div class="featured-product-description">
                    <?php echo wp_kses_post(wpautop($description)); ?>
                </div>
            <?php endif; ?>
            
            <?php if ($product_url) : ?>
                <a href="<?php echo esc_url($product_url); ?>" class="btn" target="_blank" rel="nofollow noopener">
                    <?php echo esc_html($button_text); ?>
                </a>
            <?php endif; ?>
        </div>
        <?php
        
        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : '';
        $product_url = !empty($instance['product_url']) ? $instance['product_url'] : '';
        $button_text = !empty($instance['button_text']) ? $instance['button_text'] : 'Voir sur Amazon';
        $image_url = !empty($instance['image_url']) ? $instance['image_url'] : '';
        $description = !empty($instance['description']) ? $instance['description'] : '';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">
                <?php esc_html_e('Titre :', 'massage-affiliate'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('title')); ?>" 
                   type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('product_url')); ?>">
                <?php esc_html_e('URL du produit :', 'massage-affiliate'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('product_url')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('product_url')); ?>" 
                   type="url" value="<?php echo esc_url($product_url); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('button_text')); ?>">
                <?php esc_html_e('Texte du bouton :', 'massage-affiliate'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('button_text')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('button_text')); ?>" 
                   type="text" value="<?php echo esc_attr($button_text); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('image_url')); ?>">
                <?php esc_html_e('URL de l\'image :', 'massage-affiliate'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('image_url')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('image_url')); ?>" 
                   type="url" value="<?php echo esc_url($image_url); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('description')); ?>">
                <?php esc_html_e('Description :', 'massage-affiliate'); ?>
            </label>
            <textarea class="widefat" rows="5" id="<?php echo esc_attr($this->get_field_id('description')); ?>" 
                      name="<?php echo esc_attr($this->get_field_name('description')); ?>"><?php echo esc_textarea($description); ?></textarea>
        </p>
        <?php
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['product_url'] = (!empty($new_instance['product_url'])) ? esc_url_raw($new_instance['product_url']) : '';
        $instance['button_text'] = (!empty($new_instance['button_text'])) ? sanitize_text_field($new_instance['button_text']) : '';
        $instance['image_url'] = (!empty($new_instance['image_url'])) ? esc_url_raw($new_instance['image_url']) : '';
        $instance['description'] = (!empty($new_instance['description'])) ? wp_kses_post($new_instance['description']) : '';
        
        return $instance;
    }
}

// Enregistrer le widget
function register_massage_affiliate_widgets() {
    register_widget('Massage_Affiliate_Featured_Product_Widget');
}
add_action('widgets_init', 'register_massage_affiliate_widgets');
