#!/usr/bin/env python3
"""
Syntax highlighter for JavaScript code - converts plain JS to HTML with span classes
"""

import os
import glob

# Keywords that should be highlighted
KEYWORDS = ['function', 'let', 'const', 'var', 'if', 'else', 'for', 'while', 'return', 
            'true', 'false', 'new', 'this', 'of', 'in']

# p5.js constants
CONSTANTS = ['LEFT', 'RIGHT', 'CENTER', 'TOP', 'BOTTOM', 'width', 'height', 'mouseX', 'mouseY']

def highlight_js(code):
    """Convert plain JavaScript to syntax-highlighted HTML"""
    lines = code.split('\n')
    result_lines = []
    
    for line in lines:
        comment_part = ''
        code_part = line
        
        if '//' in line:
            idx = line.index('//')
            code_part = line[:idx]
            comment_part = line[idx:]
        
        highlighted = highlight_code_part(code_part)
        
        if comment_part:
            comment_escaped = comment_part.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            highlighted += f'<span class="comment">{comment_escaped}</span>'
        
        result_lines.append(highlighted)
    
    return '\n'.join(result_lines)

def highlight_code_part(code):
    """Highlight code (no comments)"""
    if not code.strip():
        return code
    
    code = code.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    
    result = []
    i = 0
    while i < len(code):
        if code[i] == '"' or code[i] == "'":
            quote = code[i]
            j = i + 1
            while j < len(code) and code[j] != quote:
                j += 1
            j += 1
            result.append(f'<span class="string">{code[i:j]}</span>')
            i = j
            continue
        
        if code[i].isdigit():
            j = i
            while j < len(code) and code[j].isdigit():
                j += 1
            result.append(f'<span class="number">{code[i:j]}</span>')
            i = j
            continue
        
        if code[i].isalpha() or code[i] == '_':
            j = i
            while j < len(code) and (code[j].isalnum() or code[j] == '_'):
                j += 1
            word = code[i:j]
            
            is_function_call = j < len(code) and code[j] == '('
            
            if word in KEYWORDS:
                result.append(f'<span class="keyword">{word}</span>')
            elif word in CONSTANTS:
                result.append(f'<span class="variable">{word}</span>')
            elif is_function_call:
                result.append(f'<span class="function">{word}</span>')
            else:
                result.append(f'<span class="variable">{word}</span>')
            
            i = j
            continue
        
        result.append(code[i])
        i += 1
    
    return ''.join(result)

def generate_expandable_html(step_num, code):
    """Generate the full expandable HTML block for a step"""
    highlighted = highlight_js(code)
    
    return f'''
            <!-- Expandable Full Code -->
            <details class="full-code-expandable">
                <summary>📂 Adım {step_num} Sonrası Tam Kod</summary>
                <div class="code-block">
                    <div class="code-header">
                        <div class="code-dots"><span class="red"></span><span class="yellow"></span><span class="green"></span></div>
                        sketch.js - Tam Kod (Adım {step_num})
                    </div>
<pre>{highlighted}</pre>
                </div>
            </details>'''

def process_all_steps():
    """Process all step files and generate highlighted HTML"""
    code_dir = '/home/guvenc/connect4_kilo_anti/connect4-tutorial/code-versions'
    output_dir = '/home/guvenc/connect4_kilo_anti/connect4-tutorial/code-versions/html'
    
    os.makedirs(output_dir, exist_ok=True)
    
    for js_file in sorted(glob.glob(f'{code_dir}/step*.js')):
        filename = os.path.basename(js_file)
        step_num = int(filename.replace('step', '').replace('.js', ''))
        
        with open(js_file, 'r', encoding='utf-8') as f:
            code = f.read()
        
        html = generate_expandable_html(step_num, code)
        
        output_file = f'{output_dir}/step{step_num:02d}.html'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html)
        
        print(f'Generated: {output_file}')

if __name__ == '__main__':
    process_all_steps()
    print('Done!')
