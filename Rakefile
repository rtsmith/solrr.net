task :watch do
  `watchify -t [ babelify --presets [ react ] ] js/main.js -o js/bundle.js -v`
end
task :deploy do
  `JEKYLL_ENV=production jekyll build`
  `babel --out-file js/bundle-c.js js/bundle.js`
  `rsync -azv _site/ root@198.211.101.116:/var/www/solrr/`
end
