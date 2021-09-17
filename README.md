# LibertyBear
LibertyBear provides userscripts support for browsers.
It works on browsers with [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) support.

More details can be found [here](https://liberty-bear.com/).

## Environment Variables

The following environment variables will be injected at compilation time for some features to work:

- `SYNC_GOOGLE_CLIENT_ID` / `SYNC_GOOGLE_CLIENT_SECRET` - Google sync service
- `SYNC_ONEDRIVE_CLIENT_ID` / `SYNC_ONEDRIVE_CLIENT_SECRET` - OneDrive sync service

## Workflows

### Development

Make sure [Node.js](https://nodejs.org/) greater than v10.0 and Yarn v1.x is installed.

``` sh
# Install dependencies
$ yarn

# Watch and compile
$ yarn dev
```

Then load the extension from 'dist/'.

### Building

After a new (pre)release is created, we should build the project and upload to web stores.

``` sh
# Build for normal releases
$ yarn build

# Build for self-hosted release that has an update_url
$ yarn build:selfHosted
```

## Release

Just create a tag and push it.

When a tag is pushed to GitHub, a (pre)release will be created with assets built by GitHub Actions.

```sh
# Create a prerelease
$ yarn bump

# Create a patch release
$ yarn version --patch
```
