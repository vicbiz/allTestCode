<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'qInrZ]C}]ZWI8lmns*7X2cX6lV[yO2I!yJ#RVRz?,z.ua3cQ$;5+22qc}4?g$n_m' );
define( 'SECURE_AUTH_KEY',  'm$8~1c_.2-RqCU9b52Wh!r9PTXomhsu0-I]mm/LrSur}coon*4t;xS1cH=)1/B8?' );
define( 'LOGGED_IN_KEY',    '&Ef&0Z0e;<0YGUw@ |;*rX^lVxa1;YZYStC`TzI@afg}xIz2}//,fB%yo-[/)O 0' );
define( 'NONCE_KEY',        'FNkL0tWB~RwmVkl8&n&:=n:B&Pm(]*QwAl TeGh33w8&+F&VL/VQ1.x78zPgloM~' );
define( 'AUTH_SALT',        '{V|=&r,10]%yMY.Xa<XDQd?_~j#/]Q+U^:aqai?Q=m0Fv>2TT$xiEI(cAyF-R qf' );
define( 'SECURE_AUTH_SALT', 'mbr_eA9k=q/;w&Z|mQ<b~,dbzz+f^C.`)n2/a|Z4Af5D#C_5gB}W7w5Pm%XxuFgj' );
define( 'LOGGED_IN_SALT',   'qj~G_Zy?5-WgX5]$JU*DlAXFJw.wtuh;4$~E346A1=YKrUgFl>@]p :{L+jI![xi' );
define( 'NONCE_SALT',       'z~f1)FQS`I9k`IPjQ0KVh32<Y) ;?c}=W<m!?Z=W@D?xbsTX/)+Ha`3F(`Pkg}9J' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
