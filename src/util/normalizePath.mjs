/**
 * To be able to detect symbolic links instead of directories
 * trailing slashes are ALWAYS removed:
 *
 * d:/some/path/
 *
 * Will be handled as:
 *
 * d:/some/path
 *
 * To be able to distinguish between a real directory and a symoblic link to a directory.
 */
import path from "node:path"

export default function a(input) {
	let normalized = path.normalize(input)

	if (normalized.endsWith("/")) {
		normalized = normalized.slice(0, normalized.length - 1)
	}

	return normalized
}

