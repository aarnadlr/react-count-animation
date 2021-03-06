import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';
import del from 'del';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import webpackConfig from './webpack.config.dist.babel';

gulp.task('clean', () =>
  del(['./dist/*']),
);

gulp.task('webpack:build', () => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
  });
});

gulp.task('css', () =>
  gulp.src(['./style/count.css'])
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('./dist'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist')),
);

gulp.task('build', ['webpack:build', 'css'], () =>
  del('./dist/count.css'),
);

gulp.task('default', ['clean', 'build']);
