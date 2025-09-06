<?php get_header(); ?>

<div class="site-container">
    <?php if (have_posts()) : ?>
        <div class="posts-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('large'); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                    
                    <header class="entry-header">
                        <?php the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>'); ?>
                        <div class="entry-meta">
                            <?php 
                            echo '<span class="posted-on">' . get_the_date() . '</span>';
                            ?>
                        </div>
                    </header>
                    
                    <div class="entry-content">
                        <?php the_excerpt(); ?>
                    </div>
                    
                    <footer class="entry-footer">
                        <a href="<?php the_permalink(); ?>" class="read-more">
                            <?php esc_html_e('Lire la suite', 'massage-affiliate'); ?>
                        </a>
                    </footer>
                </article>
            <?php endwhile; ?>
        </div>
        
        <?php 
        the_posts_pagination(array(
            'mid_size'  => 2,
            'prev_text' => __('&larr; Précédent', 'massage-affiliate'),
            'next_text' => __('Suivant &rarr;', 'massage-affiliate'),
        ));
        ?>
        
    <?php else : ?>
        <div class="no-results">
            <h2><?php esc_html_e('Aucun article trouvé', 'massage-affiliate'); ?></h2>
            <p><?php esc_html_e('Désolé, mais aucun contenu ne correspond à vos critères.', 'massage-affiliate'); ?></p>
        </div>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
