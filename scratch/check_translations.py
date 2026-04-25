import json
import re

def check_keys(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # Very basic regex to find keys like 'nav:', 'election:'
    keys = re.findall(r'(\w+):\s*\{', content)
    print(f"Found keys: {keys}")
    
    # Check for duplicates in first 100 lines (ta section)
    ta_content = content[:content.find('en: {')]
    en_content = content[content.find('en: {'):]
    
    ta_keys = re.findall(r'(\w+):\s*\{', ta_content)
    en_keys = re.findall(r'(\w+):\s*\{', en_content)
    
    from collections import Counter
    ta_dupes = [k for k, v in Counter(ta_keys).items() if v > 1]
    en_dupes = [k for k, v in Counter(en_keys).items() if v > 1]
    
    print(f"Duplicates in TA: {ta_dupes}")
    print(f"Duplicates in EN: {en_dupes}")

check_keys('/Users/VIJAYRAMESH/Documents/Projects/TVK/src/data/translations.js')
