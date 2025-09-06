<?php get_header(); ?>

<div class="site-container">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('single-post'); ?>>
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                <div class="entry-meta">
                    <span class="posted-on">
                        <?php echo get_the_date(); ?>
                    </span>
                    <span class="byline">
                        <?php esc_html_e('Par', 'massage-affiliate'); ?> 
                        <?php the_author_posts_link(); ?>
                    </span>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content">
                <?php the_content(); ?>
                
                <?php
                // Affichage des balises de l'article
                $tags = get_the_tags();
                if ($tags) : ?>
                    <div class="post-tags">
                        <span><?php esc_html_e('Étiquettes :', 'massage-affiliate'); ?></span>
                        <?php foreach ($tags as $tag) : ?>
                            <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>">
                                <?php echo esc_html($tag->name); ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
                
                <?php
                // Navigation entre les articles
                the_post_navigation(array(
                    'prev_text' => '<span class="nav-subtitle">' . esc_html__('Article précédent', 'massage-affiliate') . '</span> <span class="nav-title">%title</span>',
                    'next_text' => '<span class="nav-subtitle">' . esc_html__('Article suivant', 'massage-affiliate') . '</span> <span class="nav-title">%title</span>',
                ));
                ?>
            </div>

            <?php
            // Si les commentaires sont ouverts ou s'il y a des commentaires
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
        </article>
    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
