import React from 'react'
import './ImpactDashboard.css'
import StatCard from './StatCard'
import ProgressChart from './ProgressChart'

function ImpactDashboard({ stats, foodItems }) {
    const achievements = [
        {
            id: 1,
            title: 'First Steps',
            description: 'Add your first food item',
            icon: '🌱',
            unlocked: foodItems.length > 0
        },
        {
            id: 2,
            title: 'Saver',
            description: 'Save 5 items from waste',
            icon: '⭐',
            unlocked: foodItems.filter(i => i.consumed).length >= 5
        },
        {
            id: 3,
            title: 'Eco Warrior',
            description: 'Save 10 items from waste',
            icon: '🏆',
            unlocked: foodItems.filter(i => i.consumed).length >= 10
        },
        {
            id: 4,
            title: 'Planet Protector',
            description: 'Prevent 25kg of CO2 emissions',
            icon: '🌍',
            unlocked: stats.co2Prevented >= 25
        }
    ]

    const unlockedAchievements = achievements.filter(a => a.unlocked)
    const totalItems = foodItems.length
    const savedItems = foodItems.filter(i => i.consumed).length
    const wasteRate = totalItems > 0 ? ((totalItems - savedItems) / totalItems * 100).toFixed(0) : 0

    return (
        <div className="impact-dashboard fade-in">
            <div className="dashboard-header">
                <h2>My Environmental Impact</h2>
                <p className="text-muted">Track your contribution to saving the planet</p>
            </div>

            <div className="stats-grid">
                <StatCard
                    icon="🥗"
                    value={stats.foodSaved.toFixed(1)}
                    unit="lbs"
                    label="Food Saved"
                    color="primary"
                />
                <StatCard
                    icon="🌍"
                    value={stats.co2Prevented.toFixed(1)}
                    unit="kg"
                    label="CO2 Prevented"
                    color="success"
                />
                <StatCard
                    icon="💧"
                    value={stats.waterSaved.toFixed(0)}
                    unit="gallons"
                    label="Water Saved"
                    color="secondary"
                />
                <StatCard
                    icon="💰"
                    value={stats.moneySaved.toFixed(0)}
                    unit="$"
                    label="Money Saved"
                    color="accent"
                />
            </div>

            <div className="dashboard-grid">
                <div className="card chart-card">
                    <h3>Your Progress</h3>
                    <ProgressChart
                        totalItems={totalItems}
                        savedItems={savedItems}
                        wasteRate={wasteRate}
                    />
                </div>

                <div className="card info-card">
                    <h3>Did You Know?</h3>
                    <div className="info-list">
                        <div className="info-item">
                            <span className="info-icon">🌍</span>
                            <p>If food waste were a country, it would be the 3rd largest emitter of greenhouse gases.</p>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">💧</span>
                            <p>Wasting 1kg of food wastes 2,500 liters of water used to produce it.</p>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">💰</span>
                            <p>The average family wastes $1,500 worth of food per year.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="achievements-section card">
                <h3>Achievements</h3>
                <p className="text-muted">
                    {unlockedAchievements.length} of {achievements.length} unlocked
                </p>
                <div className="achievements-grid">
                    {achievements.map(achievement => (
                        <div
                            key={achievement.id}
                            className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                        >
                            <span className="achievement-icon">{achievement.icon}</span>
                            <div className="achievement-content">
                                <h4>{achievement.title}</h4>
                                <p>{achievement.description}</p>
                            </div>
                            {achievement.unlocked && <span className="unlock-badge">✓</span>}
                        </div>
                    ))}
                </div>
            </div>

            {savedItems > 0 && (
                <div className="card impact-message">
                    <h3>🎉 Amazing Work!</h3>
                    <p>
                        By saving {savedItems} food item{savedItems !== 1 ? 's' : ''}, you've prevented approximately{' '}
                        <strong>{stats.co2Prevented.toFixed(1)}kg of CO2</strong> from entering the atmosphere.
                        That's equivalent to driving a car for {(stats.co2Prevented * 2.5).toFixed(0)} miles!
                    </p>
                </div>
            )}
        </div>
    )
}

export default ImpactDashboard
