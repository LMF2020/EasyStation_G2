var menuList = [{menuId: 1, menuIcon: './images/icon-clothes.png', menuTitle: '衣'}, 
{menuId: 2, menuIcon: './images/icon-food.png', menuTitle: '食'}, 
{menuId: 3, menuIcon: './images/icon-house.png',menuTitle: '住'}, 
{menuId: 4, menuIcon: './images/icon-traffic.png',menuTitle: '行'}, 
{menuId: 5, menuIcon: './images/icon-travel.png', menuTitle: '游'}, 
{menuId: 6, menuIcon: './images/icon-buy.png', menuTitle: '购'}, 
{menuId: 7, menuIcon: './images/icon-play.png', menuTitle: '娱'}, 
{menuId: 8, menuIcon: './images/icon-other.png', menuTitle: '其他'}, 
{menuId: 9, menuIcon: './images/icon-member.png', menuTitle: '会员'}, 
{menuId: 10, menuIcon: './images/icon-credits.png', menuTitle: '积分'}, 
{menuId: 11, menuIcon: './images/icon-helper.png', menuTitle: '惠民'}, 
{menuId: 12, menuIcon: './images/icon-by.png', menuTitle: '报宣'}
];

var menuOtherList = [
{ menuId: 13, menuIcon: './images/15.png',  menuTitle: '福彩'}, 
{menuId: 14,  menuIcon: './images/17.png', menuTitle: '好书推荐'}, 
{menuId: 15,  menuIcon: './images/16.png',  menuTitle: '幸福人寿'}, 
{ menuId: 16, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true},
{ menuId: 17, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true},
{ menuId: 18, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true},
{ menuId: 19, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true},
{ menuId: 20, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true}, 
{ menuId: 21, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true}, 
{ menuId: 22, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true},
{ menuId: 23, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true},
{ menuId: 24, menuIcon: './images/empty.jpg', menuTitle: '' ,hidden:true}
]

const { ipcRenderer } = require('electron')
// load node module
var path = require('path')
var fs = require('fs')
// global config
var CONFIG = require('electron').remote.getGlobal('CONFIG')
// root dir
var database = CONFIG['cache.local_dir']

// home module
var HomeModule = (function () {

    var renderPage = function (jqDom, menuList) {
        var tpl = '';
        // loop through menulist
        var _htmlTplPrefixx = '<div class="menu-inner">',
            _htmlTplSuffix = '</div>';
        for (var i = 0; i < menuList.length; i++) {
            var menu = menuList[i];
            var _imageTpl = ''
            if(menu.hidden){
                _imageTpl = '<img class="menu-icon" style="opacity: 0.0;" src="' + menu.menuIcon + '"/>';
            }else{
                _imageTpl = '<img class="menu-icon" src="' + menu.menuIcon + '" id="' + menu.menuId + '"/>';
            }
            
            var _txtTpl = '<p class="menu-title">' + menu.menuTitle + '</p>';

            tpl += _htmlTplPrefixx + _imageTpl + _txtTpl + _htmlTplSuffix;
        }
        jqDom.html(tpl)
    }

    // top Ads on the home page
    var showAdTop = function (data) {
        for (const i in data) {
            var imgPath = database + '/' + 'LTop' + '/' + data[i];
            $("#coin-sliderTop").append("<img src='" + imgPath + "'  />");
        }
        $('#coin-sliderTop').coinslider({
            width: '100%',
            height: 280,
            delay: 10000,
            effect: "random",
            navigation: false,
            links: false
        });
    }

    // bottom Ads on the home page
    var showAdBom = function (data) {
        for (const i in data) {
            var imgPath = database + '/' + 'LBottom' + '/' + data[i];
            $("#coin-sliderBom").append("<img src='" + imgPath + "'  />");
        }
        $('#coin-sliderBom').coinslider({
            width: '100%',
            height: 280,
            delay: 10000,
            effect: "random",
            navigation: false,
            links: false
        });
    }

    // read ads from local disk
    var renderAd = function () {
        var topImgDir = path.join(database, 'LTop')
        var botImgDir = path.join(database, 'LBottom')

        var topImgList = fs.readdirSync(topImgDir);
        var botImgList = fs.readdirSync(botImgDir);

        showAdTop(topImgList)
        showAdBom(botImgList)
    }

    // open page by IPC command
    var OpenPage = function (cmd) {
        ipcRenderer.sendToHost(cmd)
    }

    var showHome = function () {
        $('#menuOtherWrapper').hide()
        $('#menuWrapper').show()
        $('.center').show()
    }

    var showOther = function () {
        $('.center').hide()
        $('#menuWrapper').hide()
        $('#menuOtherWrapper').show()
    }

    var initEvt = function () {
        $('.menu-icon').on('click',function (e) {
            // e.preventDefault();
            var me = $(this);
            var type = me.attr('id');
            switch (type) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '9':
                case '10':
                case '15':
                case '11':
                    tip(me)
                    break;
                case '8':
                    // other icon
                    showOther()
                    break;
                case '12':
                    // newspaper
                    OpenPage('OPEN_AHNEWS')
                    break;
                case '13':
                    OpenPage('OPEN_AHFC')
                    break;
                case '14':
                    OpenPage('OPEN_BOOKSTORE')
                    break;
                default:
            }
        })

        ipcRenderer.on('SHOW_HOME', function () {
            showHome()
            // ipcRenderer.sendToHost('pong');
        });
    }

    var init = function () {
        renderPage($('#menuWrapper'), menuList)
        renderPage($('#menuOtherWrapper'), menuOtherList)
        renderAd()
        initEvt()
    }

    function tip($me) {
        layer.tips('功能即将上线', $me);
    }

    return {
        init: init
    }

})()

HomeModule.init()

window.onerror = function () { return true; }
document.oncontextmenu = function () { return false; }
document.onpaste = function () { return false; }
document.oncopy = function () { return false; }
document.oncut = function () { return false; }
document.onselectstart = function () { return false; }