import React from 'react'
import './StatCard.css'

function StatCard({ icon, value, unit, label, color }) {
    return (
        <div className={`stat-card card color-${color}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <div className="stat-value">
                    {/* Currency is displayed as a prefix, while other units are suffixes. */}
                    {unit === '$' && unit}
                    {value}
                    {unit !== '$' && <span className="stat-unit">{unit}</span>}
                </div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    )
}

export default StatCard
