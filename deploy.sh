#!/bin/bash
npm run web:build
cd dist
ssh maniekes@panel53.mydevil.net "rm -rv ~/domains/krojetrupy.klimonda.pl/public_html/*"
scp -rv * maniekes@panel53.mydevil.net:~/domains/krojetrupy.klimonda.pl/public_html
