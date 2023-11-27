import process from "node:process"

function entriesEqual(a, b) {
	const fields = ["is_optional", "path_type", "path", "owner", "file_mode"]

	for (const field of fields) {
		if (a[field] !== b[field]) {
			return false
		}
	}

	return true
}

export default function(entries) {
	let map = {}

	for (const entry of entries) {
		if (entry.path in map) {
			const existing = map[entry.path]

			if (!entriesEqual(existing, entry)) {
				process.stderr.write(
					`Found conflicting definitions for '${existing.path}'!\n`
				)

				process.exit(2)
			} else {
				process.stderr.write(`Duplicate definition for '${existing.path}' ... ignoring\n`)
			}
		} else {
			map[entry.path] = entry
		}
	}

	return Object.values(map)
}
