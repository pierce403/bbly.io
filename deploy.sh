npm run build --verbose &&
git rm -rf docs &&
cp -rv  build docs &&
echo bbly.io > docs/CNAME
touch docs/.nojekyll
git add docs
echo SUCCESS
