#!/usr/bin/env python3
"""
Convert <Youtube /> HTML tags to {{< youtube >}} shortcodes.

This script:
- Replaces multi-line <Youtube /> tags with {{< youtube >}} shortcode
- Removes the "title" parameter
- Retains only the "id" parameter in format: {{< youtube id="..." >}}
"""

import os
import re
import sys


def convert_youtube_tags(content):
    """
    Convert <Youtube /> tags to {{< youtube >}} shortcodes.
    
    Handles multi-line tags and extracts only the id parameter.
    """
    # Pattern to match <Youtube /> tags that may span multiple lines
    # Captures the id parameter value
    pattern = r'<Youtube\s+id="([^"]+)"[^>]*(?:title="[^"]*")?[^>]*/>'
    
    # Replace with shortcode format
    replacement = r'{{< youtube id="\1" >}}'
    
    converted = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)
    
    return converted


def process_file(file_path):
    """Process a single markdown file."""
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Convert YouTube tags
        converted_content = convert_youtube_tags(content)
        
        # Only write if there were changes
        if converted_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(converted_content)
            print(f"✓ Converted YouTube tags in {file_path}")
            return True
        else:
            print(f"- No YouTube tags found in {file_path}")
            return False
        
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}", file=sys.stderr)
        return False


def main():
    """Process all markdown files in the sources folder."""
    folder_path = '/Users/isabelmatwawana/GrafanaDocs/business-variable/docs/sources'
    
    if not os.path.isdir(folder_path):
        print(f"Error: Folder not found: {folder_path}", file=sys.stderr)
        sys.exit(1)
    
    # Find all .md files recursively
    md_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    
    if not md_files:
        print(f"No markdown files found in {folder_path}")
        sys.exit(0)
    
    print(f"Found {len(md_files)} markdown file(s) to process\n")
    
    # Process each file
    converted_count = 0
    for file_path in sorted(md_files):
        if process_file(file_path):
            converted_count += 1
    
    print(f"\n✓ Processed {len(md_files)} file(s), converted {converted_count} file(s)")


if __name__ == '__main__':
    main()
