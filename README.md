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
  "paper": "letter"
}
```

`signatureSize` is a multiple of 4. Each sheet holds four pages, two on each side. A short last signature is padded with blank slots. Paper choices are `letter`, `tabloid`, `a3`, `a4`, and `a5`.

## Layout

```
bin/        command-line entry
src/        paper, validation, splitting, imposition, marks, formatting
examples/   two fictional books
test/       unit tests
```

## Next

This is the first of six updates. The other five, about 35 hours, are in [ROADMAP.md](ROADMAP.md).

## License

MIT
