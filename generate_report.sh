#!/usr/bin/env bash

# Name of the output file for the repository tree
OUTPUT_FILE="repo_tree.txt"

# Directories and files to exclude from the tree (adjust as needed)
# - .git
# - node_modules
# - pnpm-lock.yaml
# - Any file starting with "readme" (ignoring case)
EXCLUDE_ITEMS=".git node_modules pnpm-lock.yaml [Rr][Ee][Aa][Dd][Mm][Ee]*"

# Build a pattern for 'tree' to ignore directories/files in EXCLUDE_ITEMS.
# We join them with the pipe character for the -I (ignore) pattern in 'tree'.
EXCLUDE_PATTERN=$(echo "$EXCLUDE_ITEMS" | sed 's/ /|/g')

echo "Generating a tree of the repository (ignoring .git, node_modules, pnpm-lock.yaml, and readme)..."
tree -a -I "$EXCLUDE_PATTERN" . > "$OUTPUT_FILE"
echo "Repository tree saved to '$OUTPUT_FILE'."

# Name of the output file for the repository content
CONTENT_OUTPUT_FILE="repo_content.txt"

echo "Generating a concatenated content file of all repository files (excluding .git, node_modules, pnpm-lock.yaml, and readme)..."

# Use find to list all files while pruning .git, node_modules and ignoring pnpm-lock.yaml & readme files
find . \
  \( -type d -name ".git" -o -type d -name "node_modules" \) -prune \
  -o -type f \
     ! -name "pnpm-lock.yaml" \
     ! -iname "readme*" \
  -print | while read file; do
    echo "===== $file =====" >> "$CONTENT_OUTPUT_FILE"
    cat "$file" >> "$CONTENT_OUTPUT_FILE"
    echo -e "\n" >> "$CONTENT_OUTPUT_FILE"
done

echo "Repository content saved to '$CONTENT_OUTPUT_FILE'."
