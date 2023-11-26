#!/bin/bash -eufx

npm i

rm -f ./dist/pmtree.mjs
rm -f ./dist/index.mjs

./node_modules/.bin/anio_bundler .

curl \
	--request POST \
	--data-binary "@./dist/pmtree.mjs" \
	-H "Content-Type:application/octet-stream" \
	-H "x-anio-auth-key: $ANIO_DEPLOY_KEY" \
	-H "x-anio-file-name: pmtree" \
	https://anio.sh/upload
