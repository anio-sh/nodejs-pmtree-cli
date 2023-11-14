#!/usr/bin/env node
import {execSync} from "node:child_process"
import {URL} from "node:url"
import path from "node:path"

const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname

try {
	const result = execSync(
		path.resolve(__dirname, "_pmtree_get_path_type.sh"), {
			cwd: path.resolve(__dirname, "..")
		}
	)

	const expected = ["f", "l", "d", "l", "l", "-"].join("\n")
	const actual = result.toString().trimEnd()

	if (expected !== actual) {
		process.stderr.write(`expected: ${expected.split("\n").join(",")}\n`)
		process.stderr.write(`actual  : ${actual.split("\n").join(",")}\n`)

		throw new Error(`Output does not match.`)
	}

	process.stdout.write(`pmtree_fn.mjs: ok\n`)
} catch (error) {
	process.stderr.write(`${error.message}\n`)
	process.exit(1)
}
