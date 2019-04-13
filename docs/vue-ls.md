# babel/polyfill: 
https://babeljs.io/docs/en/babel-polyfill 

# babel/plugin-transform-runtime
https://babeljs.io/docs/en/babel-plugin-transform-runtime

## NPM
npm install vue-ls --save
## Yarn
yarn add vue-ls
## Bower
- bower install vue-ls --save
- Development Setup

#install dependencies

npm install

#build dist files
 - npm run build
 - Usage
- Vue storage API.

import Storage from 'vue-ls';
```
options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

//or
//Vue.use(Storage);

new Vue({
    el: '#app',
    mounted: function() {
        Vue.ls.set('foo', 'boo');
        //Set expire for item
        Vue.ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
        Vue.ls.get('foo');
        Vue.ls.get('boo', 10); //if not set boo returned default 10
        
        let callback = (val, oldVal, uri) => {
          console.log('localStorage change', val);
        } 
        
        Vue.ls.on('foo', callback) //watch change foo key and triggered callback
        Vue.ls.off('foo', callback) //unwatch
        
        Vue.ls.remove('foo');
    }
});
```
# Global
- Vue.ls
# Context
- this.$ls
# API
## Vue.ls.get(name, def)
Returns value under name in storage. Internally parses the value from JSON before returning it.

- def: default null, returned if not set name.
## Vue.ls.set(name, value, expire)
Persists value under name in storage. Internally converts the value to JSON.

- expire: default null, life time in milliseconds name
## Vue.ls.remove(name)
Removes name from storage. Returns true if the property was successfully deleted, and false otherwise.

## Vue.ls.clear()
Clears storage.

## Vue.ls.on(name, callback)
Listen for changes persisted against name on other tabs. Triggers callback when a change occurs, passing the following arguments.

- newValue: the current value for name in storage, parsed from the persisted JSON
- oldValue: the old value for name in storage, parsed from the persisted JSON
- url: the url for the tab where the modification came from

## Vue.ls.off(name, callback)
Removes a listener previously attached with Vue.ls.on(name, callback).

# Testing
- npm run test - run unit test
- npm run test:browserstack - run browser test
  - npm run test:browserstack:chrome
  - npm run test:browserstack:ie
  - npm run test:browserstack:edge
  - npm run test:browserstack:firefox
- npm run test:browserstack:safari
- npm run test:chrome - run browser test in chrome
- npm run test:phantomjs - run browser test in phantomjs




# Note
Some browsers don't support the storage event, and most of the browsers that do support it will only call it when the storage is changed by a different window. So, open your page up in two windows. Click the links in one window and you will probably see the event in the other.

The assumption is that your page will already know all interactions with localStorage in its own window and only needs notification when a different window changes things. This, of course, is a foolish assumption. But.