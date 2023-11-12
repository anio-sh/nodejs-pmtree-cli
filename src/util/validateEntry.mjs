import validateFileMode from "./validateFileMode.mjs"

export default function(entry) {
	// symbolic links cannot have file permissions
	if (entry.path_type === "l") {
		if (entry.file_mode !== null) {
			throw new Error(
				`Symbolic link '${entry.path}' cannot have file mode '${entry.file_mode}'.`
			)
		}
	} else {
		// files/directories need to have file mode
		if (entry.file_mode === null) {
			const what = entry.path_type === "f" ? "File" : "Directory"

			throw new Error(
				`${what} '${entry.path}' must have file mode.`
			)
		}
	}

	if (entry.file_mode) {
		validateFileMode(entry.file_mode)
	}
}
