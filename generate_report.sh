#!/usr/bin/env bash

# Name of the output file for the repository tree
OUTPUT_FILE="repo_tree.txt"

# Directories and files to exclude from the tree (adjust as needed)
EXCLUDE_ITEMS=".git node_modules pnpm-lock.yaml"

# Build a pattern for 'tree' to ignore directories/files in EXCLUDE_ITEMS.
EXCLUDE_PATTERN=$(echo "$EXCLUDE_ITEMS" | sed 's/ /|/g')

# Generate a tree structure of the repository, excluding the specified directories and files
echo "Generating a tree of the repository..."
tree -a -I "$EXCLUDE_PATTERN" . > "$OUTPUT_FILE"
echo "Repository tree saved to '$OUTPUT_FILE'."

# Name of the output file for the repository content
CONTENT_OUTPUT_FILE="repo_content.txt"

echo "Generating a concatenated content file of all repository files (excluding node_modules and pnpm-lock.yaml)..."

# Use find to list all files, excluding those under any node_modules directory and any file named pnpm-lock.yaml.
find . -type d -name "node_modules" -prune -o -type f ! -name "pnpm-lock.yaml" -print | while read file; do
    echo "===== $file =====" >> "$CONTENT_OUTPUT_FILE"
    cat "$file" >> "$CONTENT_OUTPUT_FILE"
    echo -e "\n" >> "$CONTENT_OUTPUT_FILE"
done

echo "Repository content saved to '$CONTENT_OUTPUT_FILE'."
