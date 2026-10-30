import { Registry, Helper, format } from '@radiantearth/stac-fields';

// For details, please consult
// https://github.com/radiantearth/stac-browser/blob/main/docs/metadata.md

// ADD ADDITIONAL FIELDS AND EXTENSIONS HERE

// Registry.addExtension('radiant', 'Radiant Earth');
// Registry.addMetadataField('radiant:public_access', {
//     label: "Data Access",
//     formatter: value => value ? "Public" : "Private"
// });

// SWHM: show each render (render extension) collapsed, with a preview of its colormap,
// instead of listing every colormap entry (lookup tables have 256).
const toCssColor = (color) => Array.isArray(color)
  ? `rgba(${color[0]},${color[1]},${color[2]},${(color[3] ?? 255) / 255})`
  : Helper.e(color);

const colormapEntries = (colormap) => {
  if (Array.isArray(colormap)) {
    return colormap.map(([range, color]) => [range.join('–'), color]);
  }
  if (colormap && typeof colormap === 'object') {
    return Object.entries(colormap).sort((a, b) => Number(a[0]) - Number(b[0]));
  }
  return [];
};

const swatch = (color, title = '') =>
  `<span title="${Helper.e(title)}" style="display:inline-block;width:.9em;height:.9em;margin-left:2px;vertical-align:middle;border:1px solid rgba(0,0,0,.2);background:${toCssColor(color)}"></span>`;

const colormapPreview = (entries) => {
  if (entries.length > 16) {
    const step = (entries.length - 1) / 31;
    const stops = Array.from({ length: 32 }, (_, i) => toCssColor(entries[Math.round(i * step)][1]));
    return `<span style="display:inline-block;width:8em;height:.9em;vertical-align:middle;background:linear-gradient(to right,${stops.join(',')})"></span>`;
  }
  return entries.map(([key, color]) => swatch(color, key)).join('');
};

const colormapList = (entries) => {
  const list = entries.map(([key, color]) =>
    `<div>${swatch(color)} ${Helper.e(key)}: ${Helper.e(Array.isArray(color) ? color.join(', ') : color)}</div>`
  ).join('');
  return entries.length > 16 ? `<details><summary>${entries.length} entries</summary>${list}</details>` : list;
};

Registry.addMetadataField('renders', {
  label: "Renders",
  formatter: (renders, field, spec, context) => Object.entries(renders).map(([name, render]) => {
    const { colormap, ...rest } = render;
    const entries = colormapEntries(colormap);
    let body = format(rest, name, context, renders, {});
    if (entries.length > 0) {
      body += `<dl><dt>Colormap</dt><dd>${colormapList(entries)}</dd></dl>`;
    }
    return `<details><summary>${Helper.e(render.title || name)} ${colormapPreview(entries)}</summary>${body}</details>`;
  }).join('')
});

// DEFINE FIELDS TO IGNORE IN METADATA RENDERING

/**
 * Function that can be used to change the ignored fields in the metadata rendering.
 * 
 * @type {function|null}
 * @param {STACObject|Object} object The entity for which the metadata is rendered.
 * @param {string[]} fields The fields ignored by default.
 * @param {string} type The type of the entity (e.g. `CatalogLike`, `Item`, `Asset`, `Link`, `Provider`).
 * @returns {string[]} The fields to ignore in the metadata rendering.
 */
const ignoreMetadata = null;

export { ignoreMetadata };
