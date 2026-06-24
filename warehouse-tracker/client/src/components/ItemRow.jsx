/*
 * ItemRow — a single row in the stock table.
 *
 * Shows the item's details, a low-stock badge when relevant, and buttons to
 * pick one unit or delete the item. It calls the handler functions passed down
 * from App via props.
 */
export default function ItemRow({ item, onPick, onDelete }) {
  return (
    <tr className={item.lowStock ? 'row-low' : ''}>
      <td>{item.name}</td>
      <td>{item.location}</td>
      <td>{item.quantity}</td>
      <td>
        {item.lowStock ? (
          <span className="badge badge-low">Low stock</span>
        ) : (
          <span className="badge badge-ok">OK</span>
        )}
      </td>
      <td className="actions">
        <button onClick={() => onPick(item.id, 1)} disabled={item.quantity === 0}>
          Pick 1
        </button>
        <button className="danger" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
