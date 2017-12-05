# 20k Intentional Evangelistic Connections

> The original concept for this web app was started by Dave Gudgel and Bridges
Community Church.  It's our hope that this evangelistic tool will be used to 
encourage and celebrate God's life-changing work throughout the world as we
connect with unbelievers in loving, meaningful ways. If you use this web app,
we'd love to hear from you about the way 20K is benefiting your ministry.
You can contact us at [info@connectbcc.org](mailto:info@connectbcc.org).

Demo: [twentyk-demo.firebaseapp.com](https://twentyk-demo.firebaseapp.com)

## Build Setup

[Vue.js](https://vuejs.org/) and [Nuxt.js](https://nuxtjs.org/) are used to
build this site.

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the
[Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Configuration

The `config.js` file contains configuration for your site.

`goal`: The default is 20000, but can be changed to whatever the ultimate 
goal should be. So if the total connections goal should be 5,000 then set 
this to 5000.

`config`: This is the Firebase config. Replace the existing demo site config 
with the Firebase config for your site.

### Branding

If you choose to use a different goal total than 20k, it would be good to 
change the logo to match the final total. There are 2 locations that need logos 
changed. The names must match exactly.

1. `assets/images/logo.png` 300x231px

2. `static/icon.png` 512x512px - Use these exact dimensions. This file will 
be used to automatically generate icons such as favicons and android icons.

Source files for these logos can be found in the `photoshop` directory. The 
layered TIF files can be edited with Photoshop.

## Setting up Firebase

1. Create a free Firebase site at
[firebase.google.com](https://firebase.google.com)

2. Get the config by clicking "Add Firebase to your web app" on the Firebase 
Project Overview page and copy the config. Add the config to the `config.js`
file. (replace the demo config already in the file)

3. Add rules to the database for allowing access at `Database > Rules`.
```json
{
  "rules": {
    ".read": true,
    ".write": "auth !== null"
  }
}
```

4. Enable Anonymous Sign-in method at `Authentication > Sign-in Method`.

5. Add the eventual site's domain to list of Authorized domains at 
`Authentication > Sign-in Method`.

### Firebase Hosting

In the Firebase dashboard, click on `Hosting` and follow the directions if 
you wish to host the site in Firebase.

* Be sure to set the public directory to `dist`.
* Choose to set as a single-page app.

## Deploying to Firebase

1. Generate the final compiled code with `$ npm run generate`.

2. Deploy to Firebase with `$ firebase deploy`.
