/*
 * StatsBar — shows the three dashboard numbers.
 * A "presentational" component: it just receives data via props and renders it.
 */
export default function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-number">{stats.totalItems}</span>
        <span className="stat-label">Total items</span>
      </div>
      <div className="stat">
        <span className="stat-number warn">{stats.lowStockCount}</span>
        <span className="stat-label">Low stock</span>
      </div>
      <div className="stat">
        <span className="stat-number">{stats.itemsPickedToday}</span>
        <span className="stat-label">Picked today</span>
      </div>
    </div>
  );
}
