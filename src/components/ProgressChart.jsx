import React from 'react'
import './ProgressChart.css'

function ProgressChart({ totalItems, savedItems, wasteRate }) {
    // Guard against division by zero when the user has no tracked items yet.
    const savedRate = totalItems > 0 ? ((savedItems / totalItems) * 100).toFixed(0) : 0

    return (
        <div className="progress-chart">
            <div className="progress-stats">
                <div className="progress-stat">
                    <div className="progress-number">{totalItems}</div>
                    <div className="progress-label">Total Items</div>
                </div>
                <div className="progress-stat">
                    <div className="progress-number text-success">{savedItems}</div>
                    <div className="progress-label">Saved</div>
                </div>
                <div className="progress-stat">
                    <div className="progress-number text-danger">{totalItems - savedItems}</div>
                    <div className="progress-label">Wasted</div>
                </div>
            </div>

            <div className="progress-bars">
                <div className="progress-bar-container">
                    <div className="progress-bar-label">
                        <span>Saved Rate</span>
                        <span className="text-success">{savedRate}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill success"
                            style={{ width: `${savedRate}%` }}
                        />
                    </div>
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar-label">
                        <span>Waste Rate</span>
                        <span className="text-danger">{wasteRate}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill danger"
                            style={{ width: `${wasteRate}%` }}
                        />
                    </div>
                </div>
            </div>

            {totalItems === 0 && (
                <div className="empty-chart">
                    <p className="text-muted">Start tracking food to see your progress</p>
                </div>
            )}
        </div>
    )
}

export default ProgressChart
