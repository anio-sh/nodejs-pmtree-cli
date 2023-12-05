# @anio-sh/pmtree [![CI/CD](https://github.com/anio-sh/nodejs-pmtree-cli/actions/workflows/cicd.yaml/badge.svg?branch=main)](https://github.com/anio-sh/nodejs-pmtree-cli/actions/workflows/cicd.yaml)

## Introduction

A tiny script that helps you manage file permission and ownership.

Simple example:

```
# Path									Owner					File Mode

# /some/path/ is a directory
d:/some/path/							user:group				0777

# /some/path/file is a file
f:/some/path/file						user:group				0555

# /some/path/optional_file is an optional file
# default means use default file permission (which is 0640 for files)
?f:/some/path/optional_file				user:group				default
```

* Default mode for directories: 0750
* Default mode for files: 0640

Generate the bash script:

`$ ./src/cli.mjs <input-file> > output.sh`

Apply the permissions (on target system):

`$ ./output.sh `

> ⚠️  This will error out if ANY path in the list does not exist or has the wrong type.

---

To allow for missing optional entries (marked with a leading `?`) invoke the script with:

`$ ./output.sh --allow-missing-optionals`

---

For more advanced use see `/example/` folder.
