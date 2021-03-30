## A pure html css javascript strategy by using handelbars
this is a strategy of pure html project by using handelbars

## how to use it 

1. install the dependencies
```
yarn install
```
2. run dev
```
yarn dev
```
then open the browser and link to localhost:8080/pageA/ to watch your web page

3. run build
```
yarn build
```
## project file construction
```
--dist // build folder
  |--common
  |  |--js
  |--pageA // each page has one folder
  |  |  |--js
  |  |  |--css
  |  |  |--index.html
  |
--src // source code folder
  |--common
  |  |--js
  |  |--scss
  |
  |--components // handelbars partial
  |  |--componentA
  |  |  |--componentA.hbs
  |
  |--pages // your web pages
  |  |--home
  |  |  |--js
  |  |  |--scss
  |  |  |--index.hbs
  |
--package.json
--webpack.config.js
```
