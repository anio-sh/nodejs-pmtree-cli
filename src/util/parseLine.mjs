import normalizeTabs from "./normalizeTabs.mjs"
import parseDirectiveLine from "./parseDirectiveLine.mjs"

const valid_path_types = ["d:", "f:", "l:"]

// TYPE:PATH [whitespace] OWNER [whitespace] PERMISSION
export default function(input) {
	// ignore empty lines
	if (!input.trim().length) {
		return null
	}
	// ignore comment lines
	else if (input[0] === "#") {
		return null
	}
	else if (input[0] === "$") {
		return parseDirectiveLine(input)
	}

	const line = normalizeTabs(input).trimStart()
	const is_optional = line[0] === "?"
	let path_type = line.slice(0, 2) // d:
	let offset = 2

	if (is_optional) {
		path_type = line.slice(1, 3) // ?d:
		offset = 3
	}

	if (!valid_path_types.includes(path_type)) {
		throw new Error(
			`Invalid path type '${path_type}'`
		)
	}

	const fields = line.slice(offset).split("\t").filter(x => {
		return x.length
	})

	let path = null, owner = null, file_mode = null

	if (fields.length === 2) {
		[path, owner] = fields
	} else if (fields.length === 3) {
		[path, owner, file_mode] = fields
	} else {
		throw new Error(`Invalid definition '${line}'`)
	}

	return {
		is_optional,
		path_type: path_type[0],
		path, owner, file_mode
	}
}
