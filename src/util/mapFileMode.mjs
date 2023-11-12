export default function(path_type, file_mode) {
	if (file_mode !== "default") {
		return file_mode
	}

	if (path_type === "d") {
		return "0750"
	}

	return "0640"
}
