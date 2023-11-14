import path from "node:path"
import { fileURLToPath } from "node:url"

import parseMainEntryFile from "./parseMainEntryFile.mjs"
import entryToString from "./entryToString.mjs"
import readFileString from "./util/readFileString.mjs"

import checkAndRemoveDuplicates from "./checkAndRemoveDuplicates.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function(input_file) {
	let output = await readFileString(
		path.resolve(__dirname, "template.sh")
	)

	output += `\n# pmtree_fn.sh\n`
	output += await readFileString(
		path.resolve(__dirname, "pmtree_fn.sh")
	)
	output += `\n# pmtree_fn.sh\n`

	let entries = await parseMainEntryFile(input_file)

	entries = checkAndRemoveDuplicates(entries)

	for (const entry of entries) {
		output += entryToString(entry)
	}

	output += `\nif [ "$ran_without_errors" != "yes" ]; then\n`
	output += `    printf "Program ran into error(s), exiting with exit code 1\\n" >&2\n`
	output += `    exit 1\n`
	output += `else\n`
	output += `    printf "Program ran without errors!\\n"\n`
	output += `fi\n`

	return output
}
