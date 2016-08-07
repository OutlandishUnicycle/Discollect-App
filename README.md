# README for Discollect App

1.) ESLint - AirBnb Style Guide
  Steps for Sublime Text 3:
  a.) Install SublimeLinter and ESLint from Sublime Package Control
  b.) To ensure packages are installed with correct version numbers run...

    (
    export PKG=eslint-config-airbnb;
    npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
    ) 

  ...in your command line
  c.) Restart Sublime

2.) Sass
  a.) run:
    npm install -g node-sass





