import argparse
import json
import subprocess
import sys


def compile_solidity(src_path):
    # Python 3.5 only
    proc = subprocess.run(['solc', src_path, '--combined-json', 'abi,bin'],
                          check=True, stdout=subprocess.PIPE)
    return json.loads(proc.stdout.decode('utf-8'))['contracts']

def format_js(contracts):
    return '\n'.join(["var {} = {};".format(name, abi_bin)
                      for name, abi_bin in contracts.items()])

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Compile a solidity contract & create a loadScript-able js')
    parser.add_argument('src', help="solidity source")
    parser.add_argument('-o', '--outfile', nargs='?',
                        type=argparse.FileType('w'), default=sys.stdout,
                        help='JS output file. Default to stdout')

    args = parser.parse_args()

    contracts = compile_solidity(args.src)

    template = open('deploy_template.js').read()

    for name, abi_bin in contracts.items():
        with open(name+'.js', 'w') as f:
            f.write(template.format(name=name, abi_bin=abi_bin))
