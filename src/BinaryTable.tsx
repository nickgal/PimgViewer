export default function BinaryTable() {
  const flagCount = 32
  const powersOfTwo = Array.from({length: flagCount + 1}, (v, k) => 2 ** k);
  const tableRows: React.ReactNode[] = []
  powersOfTwo.forEach((e, i) => {
    tableRows.push(<BinaryTableRow key={e} index={i} value={e} />)
  })
  return (
    <table className="BinaryTable" style={{ textAlign: 'left' }}>
      <thead>
        <tr>
          <th>Bit</th>
          <th>Dec</th>
          <th>Hex</th>
          <th>Bin</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

export function BinaryTableRow({ index, value } : { index: number, value: number }) {
  return (
    <tr>
      <td>{index}</td>
      <td>{value}</td>
      <td>0x{value.toString(16)}</td>
      <td>0x{value.toString(2)}</td>
    </tr>
  )
}
