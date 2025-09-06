<?php get_header(); ?>

<div class="site-container">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('page-content'); ?>>
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="page-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content">
                <?php the_content(); ?>
                
                <?php
                // Pagination pour les pages avec le bloc "nextpage"
                wp_link_pages(array(
                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'massage-affiliate'),
                    'after'  => '</div>',
                ));
                ?>
            </div>

            <?php
            // Si les commentaires sont activés pour les pages
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
        </article>
    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
