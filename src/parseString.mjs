import fs from "node:fs/promises"
import path from "node:path"
import parseLine from "./util/parseLine.mjs"
import readFileString from "./util/readFileString.mjs"

async function handleDirective(entry, origin_dir, entries) {
	const file_path = path.resolve(origin_dir, entry.file)
	let file_contents = await readFileString(file_path)

	for (const key in entry.args) {
		const value = entry.args[key]

		file_contents = file_contents.split(
			`<${key}>`
		).join(value)
	}

	await parseString({
		input: file_contents,
		origin: file_path
	}, entries)
}

async function parseString({input, origin}, entries) {
	const origin_dir = path.dirname(
		await fs.realpath(origin)
	)

	const lines = input.split("\n")

	for (const line of lines) {
		const entry = parseLine(line)

		if (!entry) continue

		if ("directive" in entry) {
			await handleDirective(entry, origin_dir, entries)
		} else {
			entries.push(entry)
		}
	}
}

export default parseString
