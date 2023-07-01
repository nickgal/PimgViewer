import { useEffect, useRef } from "react"
import PimgFile from "./PimgFile"

export default function PimgCanvas({ file } : { file: File | undefined }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const width = 640
  const height = 480

  useEffect(() => {
    async function parsePimg(pimgFile: PimgFile | undefined, context: CanvasRenderingContext2D) {
      if (!pimgFile)
        return

        await pimgFile.parseFile()

        context.canvas.width = pimgFile.width
        context.canvas.height = pimgFile.height

        const imageData = new ImageData(pimgFile.pixels, pimgFile.width, pimgFile.height);
        imageData.data.set(pimgFile.pixels);
        context.putImageData(imageData, 0, 0);

    }
    const pimgFile = file ? new PimgFile(file) : undefined

    const canvas = canvasRef.current
    if (!canvas)
      return

    const context = canvas.getContext('2d')
    if (!context)
      return

    parsePimg(pimgFile, context)
  }, [file])

  return (
    <canvas ref={canvasRef} width={width} height={height}></canvas>
  )
}
