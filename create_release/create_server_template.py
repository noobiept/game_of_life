# python3

import os.path
import sys
import json

PROJECTS_PATH = '../../'

sys.path.append( PROJECTS_PATH )

from create_release_script import create_server_template


def go():

    indexPath = '../index.html'
    manifestPath = '../manifest.json'

    with open( manifestPath, 'r', encoding= 'utf-8' ) as f:
        manifest = f.read()

    manifest = json.loads( manifest )
    name = manifest[ 'name' ]

    destinationPath = os.path.join( PROJECTS_PATH, 'website/templates/{}/'.format( name ) )

    indexPath = os.path.realpath( indexPath )
    copyToPath = os.path.realpath( destinationPath )

    create_server_template.go( indexPath, name, copyToPath )


if __name__ == '__main__':

    go()