export function html ({ body, data }: { body: string; data: object }) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>dataloading</title>
    <link rel="stylesheet" href="https://unpkg.com/svbstrate@4.1.2/dist/svbstrate.css" />
  </head>
  <body>
    <div id="root">${body}</div>
    <script>
      window.__hydrate = ${JSON.stringify(data)};
    </script>
    <script src="/static/client.js"></script>
  </body>
</html>`
}
