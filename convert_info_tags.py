#!/usr/bin/env python3
"""
Script to convert :::info tags to {{< admonition >}} shortcodes in markdown files.

Usage: 
    python3 convert_info_tags.py <file-path>
    python3 convert_info_tags.py <directory-path>

This script will:
- Find all :::info tags (including any text on the same line)
- Replace them with {{< admonition type="note" >}} shortcodes
- Delete any text on the same line as the :::info tag
- Handle multi-line content between opening and closing tags
- Create a backup of the original file(s)
- Process a single file or all .md files in a directory recursively
"""

import sys
import re
from pathlib import Path


def convert_info_tags(file_path):
    """
    Convert :::info tags to admonition shortcodes in the specified file.
    
    Args:
        file_path: Path to the markdown file to process
    
    Returns:
        Number of replacements made
    """
    path = Path(file_path)
    
    if not path.exists():
        print(f"Error: File '{file_path}' not found")
        return 0
    
    # Skip backup files
    if path.suffix == '.backup' or '.backup' in path.suffixes:
        return 0
    
    # Create backup
    backup_path = path.with_suffix(path.suffix + '.backup')
    content = path.read_text()
    backup_path.write_text(content)
    
    # Pattern to match :::info tags with optional text on the same line
    # and capture content until closing :::
    pattern = r':::info[^\n]*\n(.*?):::'
    
    def replace_info_tag(match):
        """Replace matched :::info block with admonition shortcode."""
        # Get the content between the tags
        inner_content = match.group(1)
        # Remove trailing newline if present to avoid extra spacing
        inner_content = inner_content.rstrip('\n')
        # Return the admonition shortcode with type="note"
        return f'{{{{< admonition type="note" >}}}}\n{inner_content}\n{{{{< /admonition >}}}}'
    
    # Replace all occurrences (DOTALL flag allows . to match newlines)
    new_content = re.sub(pattern, replace_info_tag, content, flags=re.DOTALL)
    
    # Count replacements
    count = len(re.findall(pattern, content, flags=re.DOTALL))
    
    # Only write if changes were made
    if count > 0:
        path.write_text(new_content)
        print(f"Processed: {file_path}")
        print(f"  Replacements: {count}")
        print(f"  Backup: {backup_path}")
    
    return count


def process_directory(directory_path):
    """
    Process all markdown files in a directory recursively.
    
    Args:
        directory_path: Path to the directory to process
    """
    dir_path = Path(directory_path)
    
    if not dir_path.is_dir():
        print(f"Error: '{directory_path}' is not a directory")
        sys.exit(1)
    
    # Find all markdown files, excluding backups
    md_files = [f for f in dir_path.rglob('*.md') if '.backup' not in f.suffixes]
    
    if not md_files:
        print(f"No markdown files found in {directory_path}")
        return
    
    print(f"Found {len(md_files)} markdown file(s) to process\n")
    
    total_replacements = 0
    files_modified = 0
    
    for md_file in sorted(md_files):
        count = convert_info_tags(md_file)
        total_replacements += count
        if count > 0:
            files_modified += 1
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Total files processed: {len(md_files)}")
    print(f"  Files modified: {files_modified}")
    print(f"  Total replacements: {total_replacements}")
    print(f"{'='*60}")


def main():
    """Main entry point."""
    if len(sys.argv) != 2:
        print("Usage: python3 convert_info_tags.py <file-path-or-directory>")
        sys.exit(1)
    
    target_path = Path(sys.argv[1])
    
    if not target_path.exists():
        print(f"Error: '{sys.argv[1]}' does not exist")
        sys.exit(1)
    
    if target_path.is_file():
        convert_info_tags(target_path)
    elif target_path.is_dir():
        process_directory(target_path)
    else:
        print(f"Error: '{sys.argv[1]}' is neither a file nor a directory")
        sys.exit(1)


if __name__ == "__main__":
    main()
