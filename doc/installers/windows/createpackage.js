const packager = require('electron-packager')
const path = require('path')
const rootPath = path.join('./')
const currentPath = path.join(rootPath, 'doc/installers/windows')
const appName = 'EZ-2g'

const options = {
    dir: rootPath,
    icon: path.join(currentPath, 'assets', 'icons', 'win', 'icon.ico'),
    name: appName,
    overwrite: true,
    arch: 'ia32',
    asar: {
        unpackDir: 'plugins'
    },
    platform: 'win32',
    out: path.join(currentPath, 'release-builds')
}

packager(options, function done_callback(err, appPaths) {
    if (err) {
        console.error(err)
    } else {
        console.log('release done', appPaths)
    }
})

// more detail see link：https://github.com/electron-userland/electron-packager/blob/master/docs/api.md
