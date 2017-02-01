# cmp2

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Development

run `npm install` and `bower install`

You might need to rebuild deasync. To do so run :

```
cd node_modules/deasync
rm -r bin
npm install --runtime=electron --target=1.4.0 --disturl=https://atom.io/download/atom-shell --abi=51
```

Run `grunt serve` for preview.

## Build & development

evernote helper requires cherio as npm package. It should be installed when you run npm install.

If not, simply run :
```
npm instal --save cherio
```

Run `grunt build` for building

## Testing

Running `grunt test` will run the unit tests with karma.

To work with evernote helper, we need to install cheerio with npm
