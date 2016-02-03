task :watch do
  `watchify -t [ babelify --presets [ react ] ] js/main.js -o js/bundle.js -v`
end
task :deploy do
  `jekyll build`
  `rsync -azv _site/ root@198.211.101.116:/var/www/solrr/`
end
