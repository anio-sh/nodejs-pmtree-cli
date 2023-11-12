export default function(line) {
	while (line.includes("\t\t")) {
		line = line.replace("\t\t", "\t")
	}

	return line
}
