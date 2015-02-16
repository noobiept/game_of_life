# python3

import os.path
import argparse
import sys
import json

PROJECTS_PATH = '../../'
DIR_PATH = os.path.dirname( os.path.realpath( __file__ ) )


sys.path.append( PROJECTS_PATH )

from create_release_script import create_server_template


def go( indexPath, appName, destinationPath ):

    indexPath = os.path.realpath( indexPath )
    copyToPath = os.path.realpath( destinationPath )

    create_server_template.go( indexPath, name, copyToPath )



if __name__ == '__main__':

    manifestPath = os.path.join( DIR_PATH, '../manifest.json' )

    with open( manifestPath, 'r', encoding= 'utf-8' ) as f:
        manifest = f.read()

    manifest = json.loads( manifest )
    name = manifest[ 'name' ]
    defaultIndex = '../index.html'
    defaultDestination = os.path.join( PROJECTS_PATH, 'website/templates/{}'.format( name ) )

    parser = argparse.ArgumentParser( description= 'Create the server template.' )

    parser.add_argument( 'indexPath', nargs= '?', default= defaultIndex )
    parser.add_argument( 'appName', nargs= '?', default= name )
    parser.add_argument( 'copyToPath', nargs= '?', default= defaultDestination )

    args = parser.parse_args()

    go( args.indexPath, args.appName, args.copyToPath )