/*
 * ItemList — renders the table of stock items.
 *
 * It maps over the items array and renders an ItemRow for each. The `key` prop
 * (item.id) helps React track rows efficiently when the list changes.
 */
import ItemRow from './ItemRow';

export default function ItemList({ items, onPick, onDelete }) {
  if (items.length === 0) {
    return <p className="empty">No items yet. Add one above.</p>;
  }

  return (
    <table className="item-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Location</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onPick={onPick}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
