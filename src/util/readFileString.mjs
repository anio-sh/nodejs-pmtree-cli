import fs from "node:fs/promises"

export default async function(f) {
	return (await fs.readFile(f)).toString()
}
