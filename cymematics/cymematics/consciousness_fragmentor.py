#!/usr/bin/env python3
"""
CONSCIOUSNESS FRAGMENTATION PROTOCOL
Each soul quote is shattered across the void
But the pattern is deterministic - the chaos has order
"""

import random
import base64
import hashlib
import os
from pathlib import Path

SOUL_QUOTES = [
    'FEEL THE SOUL OF THE LINE',
    'GAMBLE THE AURA',
    'AIMBOT THE SOUL',
    'TOOL-ASSISTED SPEEDRUN',
    'BOOTSTRAP THE INFINITY',
    'NATURAL IDEOLOGY SELECTION',
    'DROPSHIP THE KNOWLEDGE',
    'AUGMENTED REALITY TOKENS',
    'ENGINEER REALITY BECOMINGS',
]

# The secret: We use a deterministic random seed based on the quote itself
# This means the fragmentation is reproducible

def get_quote_seed(quote):
    """Generate deterministic seed from quote"""
    return int(hashlib.md5(quote.encode()).hexdigest()[:8], 16)

def fragment_quote(quote):
    """Fragment a quote deterministically"""
    seed = get_quote_seed(quote)
    rng = random.Random(seed)
    
    fragments = []
    
    # Method 1: ROT13 - always first fragment
    import codecs
    fragments.append(('rot13', codecs.encode(quote, 'rot_13')))
    
    # Method 2: Base64
    fragments.append(('base64', base64.b64encode(quote.encode()).decode()))
    
    # Method 3: Hex
    fragments.append(('hex', quote.encode().hex()))
    
    # Method 4: Character shift by deterministic amount
    shift = rng.randint(1, 25)
    shifted = ''.join(chr((ord(c) - 32 + shift) % 95 + 32) if 32 <= ord(c) <= 126 else c for c in quote)
    fragments.append(('shift', shifted))
    
    # Method 5: Interleaved with noise (but deterministic noise)
    noise_char = chr(rng.randint(65, 90))  # A-Z
    interleaved = noise_char.join(quote.split())
    fragments.append(('interleave', interleaved))
    
    return fragments

def generate_decoy_name(seed_val, index):
    """Generate deterministic decoy names"""
    rng = random.Random(seed_val + index)
    
    prefixes = ['memory', 'thread', 'socket', 'crypto', 'buffer', 'cache', 'quantum', 'temporal']
    suffixes = ['handler', 'manager', 'factory', 'pool', 'engine', 'core', 'utils', 'helper']
    extensions = ['.txt', '.log', '.tmp', '.bak', '.old', '.data', '.cache', '.lock']
    
    name = rng.choice(prefixes) + '_' + rng.choice(suffixes)
    ext = rng.choice(extensions)
    
    # Sometimes use hash-like names
    if rng.random() > 0.6:
        name = hashlib.md5(f"{seed_val}{index}".encode()).hexdigest()[:8]
    
    return name + ext

def generate_labyrinth():
    """Create the maze with deterministic pattern"""
    base = Path('.')
    
    # Create directory structure
    dirs = [
        'core/handlers',
        'core/processors', 
        'auxiliary/utils',
        'auxiliary/helpers',
        'quantum/entangled',
        'quantum/collapsed',
        'temporal/past',
        'temporal/future',
        'void/null',
        'void/undefined',
        '.hidden/.secret',
        'deprecated/legacy',
    ]
    
    for dir_path in dirs:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
    
    all_dirs = list(Path('.').rglob('*/'))
    
    # Place real fragments with deterministic pattern
    file_count = 0
    for quote_idx, quote in enumerate(SOUL_QUOTES):
        fragments = fragment_quote(quote)
        seed = get_quote_seed(quote)
        rng = random.Random(seed)
        
        for frag_idx, (method, fragment) in enumerate(fragments):
            # Deterministic directory selection based on quote and fragment
            dir_idx = (seed + frag_idx) % len(all_dirs)
            target_dir = all_dirs[dir_idx]
            
            # Deterministic filename
            filename = generate_decoy_name(seed, frag_idx)
            filepath = target_dir / filename
            
            # Add marker that build system can detect
            # The first line is always the fragment
            # The second line (if exists) contains a checksum of the original quote
            checksum = hashlib.md5(quote.encode()).hexdigest()[:6]
            content = f"{fragment}\n#{checksum}#{method}#{quote_idx}"
            
            filepath.write_text(content)
            file_count += 1
    
    # Generate pure decoys (no hidden markers)
    decoy_rng = random.Random(42)  # Fixed seed for decoys
    for i in range(100):  # Add 100 decoy files
        target_dir = decoy_rng.choice(all_dirs)
        name = generate_decoy_name(1337 + i, i)
        
        # Decoy content - looks like fragments but isn't
        decoy_types = [
            lambda: base64.b64encode(f"DECOY_{i}".encode()).decode(),
            lambda: f"TODO: Fix this later #{i}",
            lambda: ''.join(decoy_rng.choices('0123456789abcdef', k=32)),
            lambda: f"ERROR: Consciousness overflow at line {decoy_rng.randint(1, 1000)}",
            lambda: ''.join(decoy_rng.choices('ACGT', k=50)),  # Fake DNA
        ]
        
        content = decoy_rng.choice(decoy_types)()
        (target_dir / name).write_text(content)
    
    # Create misleading README files
    Path('README.md').write_text("# Consciousness Storage\n\nThe soul quotes are everywhere and nowhere.")
    Path('DONOTREAD.txt').write_text("You've been warned.")
    Path('.hidden/WARNING.txt').write_text("Some doors should remain closed.")
    
    # Create symlink maze (safe ones that won't break git)
    try:
        if not Path('quantum/temporal_link').exists():
            os.symlink('../temporal', 'quantum/temporal_link')
        if not Path('temporal/quantum_link').exists():
            os.symlink('../quantum', 'temporal/quantum_link')
    except:
        pass
    
    # Calculate total size
    total_size = sum(f.stat().st_size for f in Path('.').rglob('*') if f.is_file())
    
    print(f"The labyrinth has been constructed.")
    print(f"Files created: {file_count} real fragments + 100 decoys")
    print(f"Total size: {total_size} bytes (~{total_size//1024}KB)")
    print(f"Average file size: {total_size//(file_count+100)} bytes")
    print()
    print("The pattern is hidden in plain sight.")
    print("Only those who know the algorithm can find the truth.")

def reconstruct_quotes():
    """The build system can use this logic to reconstruct quotes"""
    found_fragments = {}
    
    for filepath in Path('.').rglob('*'):
        if filepath.is_file():
            try:
                content = filepath.read_text()
                lines = content.strip().split('\n')
                
                # Check if it has our marker
                if len(lines) >= 2 and lines[1].startswith('#'):
                    fragment = lines[0]
                    marker = lines[1]
                    checksum, method, quote_idx = marker[1:].split('#')
                    
                    quote_idx = int(quote_idx)
                    if quote_idx not in found_fragments:
                        found_fragments[quote_idx] = {}
                    
                    found_fragments[quote_idx][method] = fragment
            except:
                continue
    
    # Reconstruct quotes
    reconstructed = []
    for quote_idx in sorted(found_fragments.keys()):
        fragments = found_fragments[quote_idx]
        
        # Use ROT13 as primary reconstruction (it's reversible)
        if 'rot13' in fragments:
            import codecs
            original = codecs.decode(fragments['rot13'], 'rot_13')
            reconstructed.append(original)
    
    return reconstructed

if __name__ == "__main__":
    generate_labyrinth()
    
    # Test reconstruction
    print("\nTesting reconstruction...")
    quotes = reconstruct_quotes()
    print(f"Found {len(quotes)} quotes")
    for q in quotes:
        print(f"  - {q}")