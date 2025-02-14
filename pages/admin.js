import { useState, useEffect } from 'react';
import { generateWeekDropdownOptions, getQueryDates, calculateRawScore } from '../lib/utils';

function AdminPage() {
    const [selectedWeek, setSelectedWeek] = useState('');
    const [weeks, setWeeks] = useState([]);
    const [participantData, setParticipantData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortColumn, setSortColumn] = useState(null); // Track the column being sorted
    const [sortOrder, setSortOrder] = useState('asc');   // 'asc' or 'desc'

    useEffect(() => {
        setWeeks(generateWeekDropdownOptions());
    }, []);

    useEffect(() => {
        if (weeks.length > 0 && !selectedWeek) {
            // Select the latest week by default only if selectedWeek is not already set
            setSelectedWeek(weeks[weeks.length - 1].label);
        }
    }, [weeks, selectedWeek]);


    const sortTable = (column) => {
        if (column === sortColumn) {
            // Toggle sort order if clicking the same column
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort column and default to ascending order
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    useEffect(() => {
        if (participantData.length > 0) {
            let sortedData = [...participantData]; // Create a copy to avoid mutating state directly
            if (sortColumn) {
                sortedData.sort((a, b) => {
                    const valA = a[sortColumn];
                    const valB = b[sortColumn];

                    if (valA < valB) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    if (valA > valB) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }
            setParticipantData(sortedData);
        }
    }, [sortColumn, sortOrder, participantData.length]);


    useEffect(() => {
        const fetchData = async () => {
            if (!selectedWeek) return;

            setLoading(true);
            try {
                const response = await fetch(`/api/weekly-data?weekLabel=${encodeURIComponent(selectedWeek)}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }
                const data = await response.json();
                setParticipantData(data);
            } catch (error) {
                console.error('Error fetching weekly data:', error);
                setParticipantData([]); // Clear data on error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedWeek, weeks]);


    return (
        <div>
            <h1 className="text-center mb-4">Admin Page</h1>

            <div className="mb-3">
                <label htmlFor="weekSelect" className="form-label">Select Week:</label>
                <select
                    className="form-select"
                    id="weekSelect"
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(e.target.value)}
                >
                    {weeks.map((week) => (
                        <option key={week.label} value={week.label}>{week.label}</option>
                    ))}
                </select>
            </div>

            <div className="table-responsive">
                <h2>Participant Data</h2>
                {!loading && (
                    <p>Total Participants: {participantData.length}</p>
                )}
                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th onClick={() => sortTable('full_name')}>
                                Full Name {sortColumn === 'full_name' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => sortTable('average_score')}>
                                Average Score % {sortColumn === 'average_score' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => sortTable('num_entries')}>
                                Number of Daily Entries {sortColumn === 'num_entries' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {participantData.map((participant) => (
                            <tr key={participant.full_name}>
                                <td>{participant.full_name}</td>
                                <td>{participant.average_score.toFixed(2)}</td>
                                <td>{participant.num_entries}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminPage;
