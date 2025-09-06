    </main>

    <footer class="site-footer">
        <div class="site-container">
            <div class="footer-widgets">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-widget">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>
                <!-- Ajoutez plus de zones de widgets si nécessaire -->
            </div>
            
            <div class="site-info">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Tous droits réservés.</p>
                <nav class="footer-navigation">
                    <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'footer',
                            'container'     => false,
                        )
                    );
                    ?>
                </nav>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
