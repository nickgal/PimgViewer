export default function PimgUpload({ handleChange } : { handleChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <form>
      <input type="file" name="file" onChange={handleChange} />
    </form>
  )
}
