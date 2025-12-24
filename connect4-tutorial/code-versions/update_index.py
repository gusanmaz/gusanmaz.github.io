#!/usr/bin/env python3
"""
Updates index.html by:
1. Replacing existing expandable code sections with syntax-highlighted versions
2. Adding expandable code sections for steps that don't have them
"""

import re
import os
import glob

def main():
    index_path = '/home/guvenc/connect4_kilo_anti/connect4-tutorial/index.html'
    html_dir = '/home/guvenc/connect4_kilo_anti/connect4-tutorial/code-versions/html'
    
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for html_file in sorted(glob.glob(f'{html_dir}/step*.html')):
        step_num = int(os.path.basename(html_file).replace('step', '').replace('.html', ''))
        
        with open(html_file, 'r', encoding='utf-8') as f:
            new_block = f.read().strip()
        
        # Check if this step already has expandable code
        check_pattern = rf'Adım {step_num} Sonrası Tam Kod'
        
        if re.search(check_pattern, content):
            # Replace existing expandable code
            old_pattern = rf'<!-- Expandable Full Code -->\s*<details class="full-code-expandable">\s*<summary>📂 Adım {step_num} Sonrası Tam Kod.*?</details>'
            match = re.search(old_pattern, content, re.DOTALL)
            if match:
                content = content[:match.start()] + new_block + content[match.end():]
                print(f'Updated Step {step_num} expandable code')
        else:
            # Need to add expandable code before the closing </section> of this step
            # Find the section for this step and insert before its closing tag
            # Pattern: Find the section that starts with STEP N and insert before its </section>
            
            # Find where next step starts
            if step_num < 21:
                next_step_pattern = rf'(</section>\s*\n\s*<!-- STEP {step_num + 1}:)'
                match = re.search(next_step_pattern, content)
                if match:
                    insert_pos = match.start()
                    # Insert expandable code before </section>
                    content = content[:insert_pos] + '\n' + new_block + '\n        ' + content[insert_pos:]
                    print(f'Added Step {step_num} expandable code')
                else:
                    print(f'Could not find insertion point for Step {step_num}')
            else:
                # For step 21, find OOP section end or last section before final game
                # Just look for the section end
                final_game_pattern = r'</section>\s*\n\s*<!-- Final'
                match = re.search(final_game_pattern, content)
                if match:
                    insert_pos = match.start()
                    content = content[:insert_pos] + '\n' + new_block + '\n        ' + content[insert_pos:]
                    print(f'Added Step {step_num} expandable code')
                else:
                    print(f'Could not find insertion point for Step {step_num}')
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('Done!')

if __name__ == '__main__':
    main()
