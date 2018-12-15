# 安徽日报-数字阅报机V2
## 简要概述：
安徽日报-数字阅报机（二代机）基于widdows平台开发，支持32和64位，是[安徽日报一代机](https://github.com/LMF2020/EasyStation_G1)的升级版
## 运行效果图：
![image 程序运行效果图](https://github.com/LMF2020/EasyStation_G2/raw/master/doc/img/1lz.gif)

### 该程序是基于ElectornJS 开发的，electronJS能够开发windows应用程序，下面整理一些参考资料
https://electronjs.org/docs
https://github.com/electron-userland/electron-packager
https://www.christianengvall.se/electron-windows-installer/
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]

### 主进程，渲染进程调试：程序启动后，在浏览器敲 CTRL+SHIFT+I
https://www.sitepoint.com/debugging-electron-application/

### 快速搭建演示项目：

1. 根目录安装依赖包：npm install
2. 配置conf.json里的本地目录cache.local_dir（演示资源文件），联系邮箱 <a href="mailto:jiangzx0526@gmail.com">jiangzx0526@gmail.com</a> 获取demo资源
3. 根目录直接启动程序：npm start ，启动脚本有写在package.json里

### 代码根目录结构:
    src/
        - config.json   // 配置文件。配置ftp，是否支持调试，本地资源目录等
        - main.js       // 主进程启动文件
        - index.html    // 程序界面
        - static
            - css
                - index.css
            - js
                - index.js  // 主模块
            - page
                - home     
                    - images
                    - home.css
                    - home.html
                    - home.js   // 主模块脚本
                - diary     
                    - images
                    - diary.css
                    - diary.html
                    - diary.js   // 日报翻页的逻辑

### 两个版本支持不同的屏幕分辨率
    一代机（共2个显示器）：
        主显示屏（视频板块）：
            视频广告位（1个）：1920*1080
        副显示屏（应用板块）：	
            屏保广告位（1个）：1366*673 （其中高度95px给了跑马灯）
            右侧广告位（上、下各1个）：595*280
    二代机（总共一台显示器）：
        视频广告位（1个）：1080*608
        屏保广告位（1个）：1080*1210
        底部广告位（上、下各1个）：1030*280

### 打包发布步骤 ：
    1. 打包: npm run pkg-win
    3. 打包的目录: doc/installers/windows/release-builds
