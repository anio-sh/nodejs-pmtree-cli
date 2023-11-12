import fs from "node:fs/promises"
import readFileString from "./util/readFileString.mjs"
import parseString from "./parseString.mjs"
import validateEntry from "./util/validateEntry.mjs"

export default async function(entry_file) {
	let entries = []

	const input = await readFileString(entry_file)

	await parseString({input, origin: entry_file}, entries)

	for (const entry of entries) {
		validateEntry(entry)
	}

	return entries
}
