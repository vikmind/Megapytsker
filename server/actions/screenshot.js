export function screenshot({ client, device, sleep, fs }, identifier, runId) {
  const runsDir = `./public/runs/${runId}`;
  if (!fs.existsSync(runsDir)){
    fs.mkdirSync(runsDir);
  }
  return client.screencap(device.id)
  .then(stream => {
    return stream.pipe(require('fs').createWriteStream(`${runsDir}/${identifier}.png`));
  })
  .then(() => sleep(1000))
  .then(() => true)
  .catch( err => {
    console.error('Something went wrong:', err.stack);
    throw new Error(`Something went wrong: ${err}`)
  });
}

export default function screenshotFactory(deps) {
  return screenshot.bind(null, deps)
}
