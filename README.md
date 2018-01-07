#### electorn document
https://electronjs.org/docs

#### package & release document
https://github.com/electron-userland/electron-packager
https://www.christianengvall.se/electron-windows-installer/
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]

#### debug main process、render process via press CTRL+SHIFT+I on desktop
https://www.sitepoint.com/debugging-electron-application/

#### getting started (require nodejs installed):
    Switch to root directory and follow below steps：
    1. npm install
    2. configure database directory
    3. npm start
	4. code . 

#### source code directory structure:
    EZ-1st-app
        - DB            // databse 
        - config.json   // configuration file
        - main.js       // main process
        - index.html    // index page
        - static
            - css
                - index.css
            - js
                - index.js  // index module
            - page
                - home     
                    - images
                    - home.css
                    - home.html
                    - home.js   // home module
                - diary     
                    - images
                    - diary.css
                    - diary.html
                    - diary.js   // diary module

#### resolution requirement：
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

#### release ：
    1. release command: npm run pkg-win
    3. release store: doc/installers/windows/release-builds
