#!/usr/bin/env node --experimental-detect-module
import main from "./index.mjs"

if (process.argv.length !== 3) {
	process.stderr.write(`Usage: anio_pmtree <input-file>\n`)
	process.exit(2)
}

try {
	process.stdout.write(
		await main(
			process.argv[2]
		)
	)
} catch (e) {
	process.stderr.write(`${e.message}\n`)
	process.exit(1)
}
