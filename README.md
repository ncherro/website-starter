# Website starter

## About

- [Webpack](https://webpack.github.io/) bundles modules
- [Gulp](http://gulpjs.com/) builds for development / production
- [Skeleton](http://getskeleton.com/) is our css base
- [Sass](http://sass-lang.com/) precompiles css

## Requirements

1. npm - `brew install npm`

## Installation

1. `npm install`

## Local server

1. `npm run start`

Compiles to the .gitignored `/dist` directory

## Build for production

1. `npm run build`

Compiles to the .gitignored `/dist` directory (coming soon)

## Deploy

We're using [gulp-s3-upload](https://www.npmjs.com/package/gulp-s3-upload) to
push files to a website-enabled
[S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)

1. set your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` ENV vars
1. `cp settings.js.example settings.js` and set the bucket name
1. run `npm run deploy`
