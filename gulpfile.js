/* global exports */

(() => {

    'use strict';

    //----- GULP -----
    const { series, parallel, src, dest, watch } = require('gulp');

    //----- GULP -----
    const
        inlineBase64  = require('gulp-inline-base64'),
        connect       = require('gulp-connect'),
        replace       = require('gulp-replace'),
        sass          = require('gulp-sass'),
        fs            = require('fs'),


        // css           = () => {
        //     return src('./src/scss/**/*.scss')
        //         .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        //         .pipe(inlineBase64(
        //             {
        //                 debug  : false,
        //                 baseDir: './src/scss/img/',
        //                 maxSize: 1
        //             }
        //         ))
        //         .pipe(replace('@charset "UTF-8";\n', ''))
        //         .pipe(dest('./docs'))
        //         .pipe(connect.reload());
        // },
        //
        // js            = () => {
        //     return src('./src/js/**/*')
        //         .pipe(dest('./docs'))
        //         .pipe(connect.reload());
        // },

        connectServer = (done) => {
            connect.server({
                root      : 'docs',
                https     : {
                    key : fs.readFileSync('_cert/localhost.key'),
                    cert: fs.readFileSync('_cert/localhost.crt')
                },
                livereload: {
                    enable: true,
                    port  : 8088
                },
                host      : 'localhost',
                port      : 8080
            });
            done();
        };

        // addWatcher    = (done) => {
        //     watch([ './src/scss/**/*', './src/js/**/*' ], parallel(css, js));
        //     done();
        // };

    sass.compiler = require('node-sass');

    // exports.default = series(
    //     parallel(
    //         css,
    //         js
    //     ),
    //     addWatcher,
    //     connectServer
    // );

    exports.default = series(
        connectServer
    );


})();

