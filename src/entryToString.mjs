import escapeshellarg from "./util/escapeshellarg.mjs"
import mapFileMode from "./util/mapFileMode.mjs"

function createTestCondition(path_type, path) {
	// make sure directories REALLY are directories
	// and not a symbolic link to a directory
	if (path_type === "d") {
		return `[ -d ${path} ] && [ ! -L ${path} ]`
	}
	// make sure files REALLY are files
	// and not a symbolic link to a file
	else if (path_type === "f") {
		return `[ -f ${path} ] && [ ! -L ${path} ]`
	}

	return `[ -L ${path} ]`
}

function generateErrorPrintf(escaped_path, skipped = false) {
	return `printf "${(skipped ? "skipped: " : "")}path '%s' does not exist or has the wrong type\\n" ${escaped_path} >&2`
}

export default function(entry) {
	const {path_type} = entry
	const escaped_path = escapeshellarg(entry.path)

	let str = "\n"

	str += `if ${createTestCondition(path_type, escaped_path)}; then\n`
	str += `    chown -h ${escapeshellarg(entry.owner)} ${escaped_path}\n`

	if (entry.file_mode) {
		str += `    chmod ${mapFileMode(path_type, entry.file_mode)} ${escaped_path}\n`
	}

	str += `else\n`

	// check if optionals should exist or not with flag
	if (!entry.is_optional) {
		str += `    ${generateErrorPrintf(escaped_path)}\n`
		str += `    ran_without_errors="no"\n`
	} else {
		str += `    if [ "$allow_optionals_to_be_missing" = "no" ]; then\n`
		str += `        ${generateErrorPrintf(escaped_path)}\n`
		str += `        ran_without_errors="no"\n`
		str += `    else\n`
		str += `        ${generateErrorPrintf(escaped_path, true)}\n`
		str += `    fi\n`
	}

	str += `fi\n`

	return str
}
