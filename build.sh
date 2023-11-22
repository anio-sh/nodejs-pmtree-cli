#!/bin/bash -eufx

npm i

./node_modules/.bin/rollup \
	--file bundle.mjs \
	src/cli.mjs

curl \
	--request POST \
	--data-binary "@./bundle.mjs" \
	-H "Content-Type:application/octet-stream" \
	-H "x-anio-auth-key: $ANIO_DEPLOY_KEY" \
	-H "x-anio-file-name: pmtree" \
	https://anio.sh/upload
