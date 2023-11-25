#!/bin/bash -euf

#
# Do not directly run this file
#

source "bundle.resources/pmtree_fn.sh"

pmtree_get_path_type "test/fakeroot/regular-file"
pmtree_get_path_type "test/fakeroot/link-to-regular-file"
pmtree_get_path_type "test/fakeroot/dir"
pmtree_get_path_type "test/fakeroot/link-to-dir"
pmtree_get_path_type "test/fakeroot/dangling-link"

pmtree_get_path_type "test/fakeroot/non-existing-path"
