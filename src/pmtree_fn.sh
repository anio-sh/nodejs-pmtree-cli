function pmtree_get_path_type() {
    if [ -L "$1" ]; then
        printf "%s\n" "l"
    elif [ -f "$1" ]; then
        printf "%s\n" "f"
    elif [ -d "$1" ]; then
        printf "%s\n" "d"
    else
        printf "%s\n" "-"
    fi
}

function pmtree_path_type_to_noun() {
    if [ "$1" = "l" ]; then
        printf "symbolic link\n"
    elif [ "$1" = "f" ]; then
        printf "regular file\n"
    elif [ "$1" = "d" ]; then
        printf "directory\n"
    else
        printf "###\n"
    fi
}
