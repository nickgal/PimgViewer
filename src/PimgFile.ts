export default class PimgFile {
  file: File
  endian = true // true for little endian
  frameWidth: number = 0
  width: number = 0
  height: number = 0
  colorTable: Color[] = []
  pixels: Uint8ClampedArray = new Uint8ClampedArray()

  constructor(file: File) {
    this.file = file;
  }

  async parseFile() {
    let pos = 0
    const arrayBuffer = await this.file.arrayBuffer()
    const view = new DataView(arrayBuffer)

    this.frameWidth = view.getUint32(4, this.endian)
    this.width = view.getUint32(8, this.endian)
    this.height = view.getUint32(12, this.endian)

    pos = 28
    const numColors = view.getUint32(pos, this.endian)
    pos += 4

    for (let i = 0; i < numColors; i++) {
      this.colorTable[i] = new Color(
        view.getUint8(pos++),
        view.getUint8(pos++),
        view.getUint8(pos++),
        view.getUint8(pos++)
      )
    }

    const hasColorTable = numColors > 0
    const numComponents = 4

    const pixelComponents = this.width * this.height * numComponents
    this.pixels = new Uint8ClampedArray(pixelComponents)
    for (let i = 0; i < pixelComponents; i += numComponents)
    {
      if (pos >= view.byteLength) {
        break
      }

      if (hasColorTable) {
        const colorIndex = view.getUint8(pos++)
        const color = this.colorTable[colorIndex]
        this.pixels[i] = color.red
        this.pixels[i + 1] = color.green
        this.pixels[i + 2] = color.blue
        this.pixels[i + 3] = colorIndex == 0 ? 0 : 0xff
      } else {
        // not sure about any of this. D85BFEE3 is the first case I found
        // maybe this is an animation? i think it is
        this.pixels[i] = view.getUint8(pos++)
        this.pixels[i + 1] = view.getUint8(pos++)
        this.pixels[i + 2] = view.getUint8(pos++)
        this.pixels[i + 3] = 0xff
      }

    }
  }
}

class Color {
  red: number
  green: number
  blue: number
  reserved: number

  constructor(red: number, green: number, blue: number, reserved: number) {
    this.red = red
    this.green = green
    this.blue = blue
    this.reserved = reserved
  }
}
