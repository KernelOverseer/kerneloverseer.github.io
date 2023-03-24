import sys
import re

color_regex = re.compile('[0-9A-Fa-f]{8}')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: %s <palette.txt>" % (sys.argv[0]))
        exit(1)
    with open(sys.argv[1], 'r') as pfile:
        colors = []
        lines = pfile.read().split('\n')
        for line in lines:
            if not line.startswith(';'):
                result = color_regex.search(line)
                if result:
                    colors.append("#"+result.group(0))
        print(colors)
        exit(0)
    exit(1)
