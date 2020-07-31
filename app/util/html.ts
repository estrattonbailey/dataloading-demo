export function html ({ body }: { body: string }) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>dataloading</title>
    <link rel="stylesheet" href="https://unpkg.com/svbstrate@4.1.2/dist/svbstrate.css" />
  </head>
  <body>
    ${body}
  </body>
</html>`
}
