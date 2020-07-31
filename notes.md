# my-app

### Android
```
cd my-app && npm run cordova-serve-android
```

### Browser
```
cd my-app && npm run cordova-serve-browser
```

### SERVER PUSH
```
git add . && git commit -a -m 'default' && git push live master
```

### GENERATE DEBUG APK ###
```
cd R:\uygulama\my-app && npm run cordova-build-only-www-android
cd R:\uygulama\my-app\src-cordova && cordova build android --debug
```

### GENERATE & SIGN APK ###
```
cd R:\uygulama\my-app && npm run cordova-build-android
cd R:\uygulama\my-app\src-cordova\platforms\android\app\build\outputs\apk\release
keytool -genkey -v -keystore topcorn.keystore -alias topcorn -keyalg RSA -keysize 2048 -validity 10000
jarsigner -sigalg SHA1withRSA -digestalg SHA1 -verbose -keystore topcorn.keystore app-release-unsigned.apk topcorn

zipalign:
C:\Users\sadec\AppData\Local\Android\Sdk\build-tools\30.0.0\zipalign -v 4 app-release-unsigned.apk aligned.apk
```



…or create a new repository on the command line
echo "# topcorn-app" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:BestMidEver/topcorn-app.git
git push -u origin master
                
…or push an existing repository from the command line
git remote add origin git@github.com:BestMidEver/topcorn-app.git
git push -u origin master
…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.