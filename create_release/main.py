# python3

import sys
import os.path
import json

PROJECTS_PATH = '../../'

sys.path.append( PROJECTS_PATH )

from create_release_script import main


def go():

    indexPath = '../index.html'
    manifestPath = '../manifest.json'
    concatenatePath = 'concatenate_config.json'
    copyFilesPath = 'copy_files_config.json'

    manifestPath = os.path.realpath( manifestPath )

    with open( manifestPath, 'r', encoding= 'utf-8' ) as f:
        manifest = f.read()

    manifest = json.loads( manifest )
    name = manifest[ 'name' ]
    version = manifest[ 'version' ]

    resultingFolder = '../release/{}'.format( name )


        # absolute paths
    htmlFile = os.path.realpath( indexPath )
    copyFilesConfig = os.path.realpath( copyFilesPath )
    concatenateConfig = os.path.realpath( concatenatePath )
    resultingFolder = os.path.realpath( '{} {}'.format( resultingFolder, version ) )

    baseDirectory = os.path.realpath( '' )

    main.go( htmlFile, copyFilesConfig, concatenateConfig, resultingFolder, baseDirectory )



if __name__ == '__main__':    

    go()
