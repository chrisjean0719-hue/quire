# Quire

A command-line planner for a small hand-bound book. It splits a page count into signatures and lays each signature out as nested folios, so the outside of the first sheet shows the last page beside page 1.

It is for someone printing a chapbook at home. The sample books are made up. The tool does not store names, addresses, or customer orders.

Written in JavaScript for Node.js 22.12 or newer, with no dependencies. Tests use the built-in `node:test` runner.

## Run

```bash
node bin/quire.js plan examples/chapbook.json
npm test
```

A book looks like this:

```json
{
  "title": "Sample chapbook",
  "pageCount": 24,
  "signatureSize": 8,
  "imposition": "quarto",
  "paper": "letter",
  "parent": "tabloid",
  "grain": "long"
}
```

`signatureSize` is a multiple of 4. `imposition` is `folio`, `quarto`, or `octavo`. Folio puts four pages on a sheet, two on each side, and nests those sheets. Quarto puts eight pages on one sheet. Octavo puts sixteen. A short last signature is padded with blank slots. Paper choices are `letter`, `tabloid`, `a3`, `a4`, and `a5`. Leave `imposition` out to keep the folio layout. `parent` is the larger sheet those printed sheets are cut from. `grain` is `long` or `short`, and the plan warns when a fold runs along that grain.

## Layout

```
bin/        command-line entry
src/        paper, fit, grain, splitting, imposition, marks, formatting
examples/   fictional books
test/       unit tests
```

## Next

This is the third of six updates. Three updates remain in that series. After the sixth, about 38 hours of later work stay in [ROADMAP.md](ROADMAP.md).

## License

MIT
