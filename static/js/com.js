/**
 * Common JS
 */
var path = require('path')
var fs = require('fs')
COMJS = (function () {

    // read txt file, e.g:example.txt
    var readfile = function (path) {
        var data = fs.readFileSync(path, 'utf8');
        // remove space and special chars
        data = data.replace(/\s+/g, "").replace(/[\'\"\f\n\r\t]/g, '')
        return data
    }

    // validate URL
    var isValidUrl = function (url) {
        if (url) {
            return url.match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
        }
        return false;
    }

    /**
     * read images info from local disk
     * e.g: img represents an image, img[] represents more than one images and image struct as below
       img = {
            name: finfo[0], // image name
            ext: finfo[1],  // image extension name
            url: ''         // image url
        }
     */
    var readImages = function (dir) {
        var imgs = []
        var urls = {}
        fs.readdirSync(dir).forEach(function (file) {
            // read config file with txt format
            if (file.lastIndexOf('.txt') != -1) {
                var pathname = path.join(dir, file)
                var data = COMJS.readfile(pathname)
                var urlpairs = data.split(';')
                for (const key in urlpairs) {
                    if (urlpairs[key] && urlpairs[key].indexOf(',' != -1)) {
                        var pair = urlpairs[key].split(',')
                        var imgName = pair[0].substr(0, pair[0].indexOf('.'))
                        urls[imgName] = pair[1]
                    }
                }
                // read images that match such format
            } else if (file.match(/^.*\.(jpg|png|gif|bmp)$/)) {
                var finfo = file.split('.')
                var img = {
                    name: finfo[0], // image name
                    ext: finfo[1],  // image extension name
                    url: ''         // image url
                }
                imgs.push(img)
            } else {
                console.log('The file is not image format', file)
            }
        })
        // mapping image name and image url
        for (const key in imgs) {
            // compare image name
            var name = imgs[key]['name']
            // find image url
            if (urls.hasOwnProperty(name)) {
                imgs[key]['url'] = urls[name]
            }
        }

        return imgs;
    }

    return {
        readfile: readfile,
        isValidUrl: isValidUrl,
        readImages: readImages,
        HOME_URL: "./static/page/home/home.html"
    }
})()

// var homeUrl = path.join(__dirname, '../page/home/home.html')
// var webview = document.querySelector('webview')
// webview.loadURL('file://' + homeUrl)