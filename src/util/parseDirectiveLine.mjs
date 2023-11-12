export default function(line) {
	if (!line.startsWith("$include ")) {
		throw new Error(`Invalid directive line '${line}'.`)
	}

	const tmp = line.slice("$include ".length)
	const include_file = tmp.slice(0, tmp.indexOf(" "))
	const include_args = tmp.slice(include_file.length)

	return {
		directive: "include",
		file: include_file,
		args: JSON.parse(include_args)
	}
}
