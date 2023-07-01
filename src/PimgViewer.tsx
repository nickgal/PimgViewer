import { useState } from "react"
import PimgUpload from "./PimgUpload"
import PimgCanvas from "./PimgCanvas"

export default function PimgViewer() {
  const [fileLoaded, setFileLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | undefined>()

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files)
      return;

    setSelectedFile(files[0])
    setFileLoaded(true)
  }

  const onFileDeselect = () => {
    setSelectedFile(undefined)
    setFileLoaded(false)
  }

  if (!fileLoaded) {
    return (
      <PimgUpload handleChange={onFileSelect} />
    )
  }

  return (
    <>
      {selectedFile?.name} <button onClick={onFileDeselect}>X</button>
      <PimgCanvas file={selectedFile} />
    </>
  )
}
