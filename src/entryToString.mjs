import escapeshellarg from "./util/escapeshellarg.mjs"
import mapFileMode from "./util/mapFileMode.mjs"

function convertEntryToComment(entry) {
	const file_mode = entry.file_mode !== null ? ` ${entry.file_mode}` : ""
	const opt = entry.is_optional ? "?" : ""

	return `# ${opt}${entry.path_type}:${entry.path} ${entry.owner}${file_mode}`
}

export default function(entry) {
	const {path_type} = entry
	const escaped_path = escapeshellarg(entry.path)
	const path_noun = entry.is_optional ? "Optional Path" : "Path"

	let str = "\n"

	str += `${convertEntryToComment(entry)}\n`
	str += `result="$(pmtree_get_path_type ${escaped_path})"\n`

	str += `if [ "$result" = "-" ]; then\n`
	str += `    printf "${path_noun} '%s' does not exist!" ${escaped_path} >&2\n`

	// depending on whether the entry is optional or not
	// an error is flagged
	if (entry.is_optional) {
		// only flag as error if script was not invoked with --allow-missing-optionals
		str += `    if [ "$allow_optionals_to_be_missing" != "yes" ]; then\n`
		str += `        printf " (this is an error)\\n"\n`
		str += `        ran_without_errors="no"\n`
		str += `    else\n`
		str += `        printf " (skipping)\\n"\n`
		str += `    fi\n`
	} else {
		// always flag it as an error when entry is NOT optional
		str += `    printf " (this is an error)\\n"\n`
		str += `    ran_without_errors="no"\n`
	}

	str += `elif [ "$result" = "${path_type}" ]; then\n`
	str += `    chown -h ${escapeshellarg(entry.owner)} ${escaped_path}\n`

	if (entry.file_mode) {
		str += `    chmod ${mapFileMode(path_type, entry.file_mode)} ${escaped_path}\n`
	}

	str += `else\n`

	str += `    printf "${path_noun} '%s' is a %s but expected it to be a %s. (this is always an error)\\n" \\\n`
	str += `        ${escaped_path} \\\n`
	str += `        "$(pmtree_path_type_to_noun "$result")" \\\n`
	str += `        "$(pmtree_path_type_to_noun "${path_type}")" >&2\n`
	str += `    ran_without_errors="no"\n`

	str += `fi\n`

	return str
}
