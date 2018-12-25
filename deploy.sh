npm run build &&
git rm -rf docs &&
cp -rv  build docs &&
echo bbly.io > docs/CNAME
git add docs
echo SUCCESS
