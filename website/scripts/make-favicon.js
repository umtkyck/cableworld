// Builds app/favicon.ico by wrapping the PNG produced by the /icon route in
// an ICO container (ICO supports PNG-compressed entries for 32x32+).
// Usage: node scripts/make-favicon.js [iconUrl]

const fs = require('fs')
const path = require('path')

const ICON_URL = process.argv[2] || 'http://localhost:3000/icon'

async function main() {
  const res = await fetch(ICON_URL)
  if (!res.ok) throw new Error(`Failed to fetch ${ICON_URL}: ${res.status}`)
  const png = Buffer.from(await res.arrayBuffer())

  // ICONDIR (6 bytes) + one ICONDIRENTRY (16 bytes) + PNG payload
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // image count

  const entry = Buffer.alloc(16)
  entry.writeUInt8(32, 0) // width
  entry.writeUInt8(32, 1) // height
  entry.writeUInt8(0, 2) // palette
  entry.writeUInt8(0, 3) // reserved
  entry.writeUInt16LE(1, 4) // color planes
  entry.writeUInt16LE(32, 6) // bits per pixel
  entry.writeUInt32LE(png.length, 8) // image size
  entry.writeUInt32LE(22, 12) // image offset (6 + 16)

  const out = path.join(__dirname, '..', 'app', 'favicon.ico')
  fs.writeFileSync(out, Buffer.concat([header, entry, png]))
  console.log(`Wrote ${out} (${6 + 16 + png.length} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
