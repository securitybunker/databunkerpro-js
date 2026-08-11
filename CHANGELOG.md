# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-08-11

First release published to npm. The version number continues the in-repo history —
1.0.0 existed as a commit but was never published, so `databunkerpro-js@1.1.0` is the
earliest installable version.

### Added
- File Storage API: `createFile`, `getFile`, `downloadFile`, `listUserFiles`,
  `replaceFileTags`, `deleteFile`
- `bulkListFilesByTag` to list files carrying a tag across all users in a tenant
- Optional `tag` filter on `listUserFiles`
- ESM build at `lib/esm/`, alongside the existing CommonJS build, wired through an
  `exports` map so both `require()` and `import` resolve correctly
- Browser builds at `lib/databunkerpro-api.browser.js` and a minified
  `lib/databunkerpro-api.min.js` (44.5kB to 15.2kB) with a source map, for loading the
  client from a `<script>` tag with no bundler. The `unpkg` and `jsdelivr` fields point
  at the minified file, so `https://unpkg.com/databunkerpro-js` serves it directly.

### Fixed
- `package.json` advertised an ESM entry point (`lib/databunkerpro-api.esm.js`) that the
  build never produced, so bundlers preferring the `module` field failed to resolve it
- The package tarball shipped copies of the client from `src/` alongside the real build.
  Only `lib/` ships now, so there is exactly one copy of each entry point.

### Removed
- `getTenantConf`. It wrapped an internal portal endpoint that is not part of the public
  API, and called `TenantGetConf`, which does not exist on the server.
