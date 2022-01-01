## Export DOM.RIA property listings to CSV
Use this tool to export property listings from https://dom.ria.com/ to CSV for use with GIS mapping software, like Google Earth.

### Instructions
- Clone this repo
- `yarn && yarn build`
- Copy `config.json.example` to `config.json`
- Add your DOM.RIA API key to `config.json`
- Modify the `searchParams` object to your liking. [Developer documentation here.](https://api-docs-v2.readthedocs.io/ru/latest/dom_ria/search.html)
- Run `DEBUG=axios node app.js`
- Wait for your CSV to be generated!