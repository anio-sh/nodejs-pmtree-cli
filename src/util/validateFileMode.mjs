export default function(file_mode) {
	if (file_mode === null) return

	const allowed_chars = [
		"0", "1", "2", "3", "4", "5", "6", "7"
	]

	if (file_mode === "default") return

	if (file_mode.length !== 4) {
		throw new Error(`Invalid file mode length '${file_mode}'`)
	}

	for (const ch of file_mode) {
		if (!allowed_chars.includes(ch)) {
			throw new Error(`Illegal character in file mode ${ch} '${file_mode}'`)
		}
	}
}
