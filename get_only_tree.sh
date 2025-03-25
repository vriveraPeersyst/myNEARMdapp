#!/usr/bin/env bash

# Name of the output file
OUTPUT_FILE="repo_tree.txt"

# Directories to exclude from the tree
# Adjust as needed (e.g., .git node_modules dist build coverage).
EXCLUDE_DIRS=".git node_modules"

# Build a pattern for 'tree' to ignore directories in EXCLUDE_DIRS.
EXCLUDE_PATTERN=$(echo "$EXCLUDE_DIRS" | sed 's/ /|/g')

# Generate a tree structure of the repository, excluding the specified directories
echo "Generating a tree of the repository..."
tree -a -I "$EXCLUDE_PATTERN" . > "$OUTPUT_FILE"

echo "Done! The repository tree is saved to '$OUTPUT_FILE'."