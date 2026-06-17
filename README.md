# STAC Browser

A [Spatio-Temporal Asset Catalog (STAC)](https://github.com/radiantearth/stac-spec) browser for static catalogs,
implemented as a single page application (SPA). This is a trimmed-down fork focused on building and serving a
simple static site for browsing STAC catalogs.

Based on [`@radiantearth/stac-browser`](https://github.com/radiantearth/stac-browser) v3.3.4
(supports all STAC versions between 0.6.0 and 1.1.0). For the full feature set, options reference, and
contribution guide, see the upstream project.

## Get Started

Clone this repository, switch into the folder, and install dependencies:

```bash
npm install
```

To browse your own static STAC catalog or STAC API, set the `catalogUrl` parameter when running the dev server.
For example, pointing at EarthSearch (`https://earth-search.aws.element84.com/v1/`):

```bash
npm start -- --open --catalogUrl="https://earth-search.aws.element84.com/v1/"
```

## Build a static site

```bash
npm run build -- --catalogUrl="https://earth-search.aws.element84.com/v1/"
```

After building, `dist/` contains all the static assets needed to host the browser. Copy them to any static web host.

> **Note:** This works on the root path of your domain. To publish in a sub-folder, set the `pathPrefix` option.
> If `historyMode` is `history` (the default), configure URL rewriting on your host so deep links resolve to `index.html`.

Most options can be set via CLI, environment variables, or the [config file](config.js).

## Customize

- **Themes** — edit the Sass files in `src/theme` (start with `variables.scss`).
- **Basemaps** — configure in `basemaps.config.js`.
- **Metadata fields** — register custom rendering rules in `fields.config.js`.

## License

ISC — see [LICENSE](LICENSE).
