import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import type { Vet } from '../types/vet';
import vetsData from '../data/vets.json';

// Simple client-side auth for local usage safety
const ACCESS_CODE = 'pack-admin-2026';

type FilterType = 'all' | 'missing_data' | 'pending' | 'modified';

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin_auth') === 'true');
    const [password, setPassword] = useState('');
    const [vets, setVets] = useState<Vet[]>(vetsData as Vet[]);
    // Removed duplicate state for filteredVets, using useMemo instead
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [modifiedIds, setModifiedIds] = useState<Set<string>>(new Set());
    const [editingVet, setEditingVet] = useState<Vet | null>(null);
    const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);

    // Filter logic optimized with useMemo to prevent useEffect state setting loops
    const filteredVets = useMemo(() => {
        let result = vets;
        const lowerTerm = searchTerm.toLowerCase();

        // 1. Apply Search
        if (lowerTerm) {
            result = result.filter(v =>
                (v.practice_name || '').toLowerCase().includes(lowerTerm) ||
                (v.city || '').toLowerCase().includes(lowerTerm) ||
                (v.address || '').toLowerCase().includes(lowerTerm)
            );
        }

        // 2. Apply Filter
        if (filterType === 'missing_data') {
            result = result.filter(v => !v.contact?.phone || !v.contact?.website);
        } else if (filterType === 'pending') {
            result = result.filter(v => v.community_status === 'Pending' || v.community_status === 'Unverified');
        } else if (filterType === 'modified') {
            result = result.filter(v => modifiedIds.has(v.id));
        }

        return result;
    }, [searchTerm, vets, filterType, modifiedIds]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ACCESS_CODE) {
            setIsAuthenticated(true);
            localStorage.setItem('admin_auth', 'true');
        } else {
            alert('Invalid Access Code');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_auth');
    };

    const handleSaveVet = (updatedVet: Vet) => {
        const newVets = vets.map(v => v.id === updatedVet.id ? updatedVet : v);
        setVets(newVets);
        setModifiedIds(prev => new Set(prev).add(updatedVet.id));
        setEditingVet(null);
        setShowUnsavedChanges(true);
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(vets, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'vets.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        setShowUnsavedChanges(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
                <Helmet><title>Admin Login | The Pack</title></Helmet>
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-primary/5">
                    <h1 className="text-2xl font-black text-primary mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Access Code"
                            aria-label="Access Code"
                            className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-accent/20 focus:outline-none"
                        />
                        <button type="submit" className="w-full py-3 bg-primary text-secondary font-bold rounded-xl hover:bg-primary/90 transition-colors">
                            Enter Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary/30 pb-20">
            <Helmet><title>Admin Dashboard | The Pack</title></Helmet>

            {/* Header */}
            <header className="bg-white border-b border-primary/5 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-black text-primary">The Pack <span className="text-accent">Admin</span></h1>
                    <div className="flex items-center gap-4">
                        {showUnsavedChanges && (
                            <span className="text-xs font-bold text-amber-500 animate-pulse">● Unsaved Changes</span>
                        )}
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-accent text-white text-xs font-bold rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
                        >
                            <span>💾</span> Export JSON
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-xs font-bold text-primary/60 hover:text-primary"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl border border-primary/5 shadow-sm">
                        <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Total Vets</span>
                        <p className="text-2xl font-black text-primary">{vets.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-primary/5 shadow-sm">
                        <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Verified</span>
                        <p className="text-2xl font-black text-green-500">
                            {vets.filter(v => v.community_status === 'Verified').length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-primary/5 shadow-sm">
                        <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Emergency 24/7</span>
                        <p className="text-2xl font-black text-red-500">
                            {vets.filter(v => v.verification?.emergency_services === '24/7').length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-primary/5 shadow-sm">
                        <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Pending Review</span>
                        <p className="text-2xl font-black text-amber-500">
                            {vets.filter(v => v.community_status === 'Pending').length}
                        </p>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mb-6 flex gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search vets..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            aria-label="Search vets"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                    </div>
                    <div className="w-1/3 min-w-[200px]">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as FilterType)}
                            aria-label="Filter Vets"
                            className="w-full h-full px-4 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm font-bold text-primary"
                        >
                            <option value="all">Show All</option>
                            <option value="missing_data">⚠️ Missing Contact Info</option>
                            <option value="pending">⏳ Pending / Unverified</option>
                            <option value="modified">📝 Recently Modified</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-primary/60 border-b border-primary/5">
                                    <th className="p-4 font-bold">Name</th>
                                    <th className="p-4 font-bold">City</th>
                                    <th className="p-4 font-bold">Status</th>
                                    <th className="p-4 font-bold">English Score</th>
                                    <th className="p-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5 text-sm">
                                {filteredVets.map(vet => (
                                    <tr key={vet.id} className={`hover:bg-gray-50/50 transition-colors group ${modifiedIds.has(vet.id) ? 'bg-amber-50/50' : ''}`}>
                                        <td className="p-4 font-bold text-primary">
                                            {vet.practice_name}
                                            <div className="text-[10px] font-normal text-primary/40 truncate max-w-[200px]">
                                                {vet.id} {modifiedIds.has(vet.id) && <span className="text-amber-600 font-bold ml-1">(Modified)</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-primary/80">{vet.city}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${vet.community_status === 'Verified' ? 'bg-green-100 text-green-700' :
                                                vet.community_status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                {vet.community_status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                {vet.verification?.english_signals ? (
                                                    <span className="font-bold text-primary">{vet.verification.english_signals.length} signals</span>
                                                ) : <span className="text-gray-300">-</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => setEditingVet(vet)}
                                                className="px-3 py-1.5 border border-primary/10 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            {editingVet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-primary/5 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-black text-primary">Edit Vet</h2>
                            <button onClick={() => setEditingVet(null)} className="text-gray-400 hover:text-primary">✕</button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Practice Name</label>
                                    <input
                                        type="text"
                                        aria-label="Practice Name"
                                        className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium"
                                        value={editingVet.practice_name}
                                        onChange={e => setEditingVet({ ...editingVet, practice_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">City</label>
                                    <input
                                        type="text"
                                        aria-label="City"
                                        className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium"
                                        value={editingVet.city}
                                        onChange={e => setEditingVet({ ...editingVet, city: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">District</label>
                                    <input
                                        type="text"
                                        aria-label="District"
                                        className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium"
                                        value={editingVet.district || ''}
                                        onChange={e => setEditingVet({ ...editingVet, district: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Status</label>
                                    <select
                                        className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium"
                                        aria-label="Community Status"
                                        value={editingVet.community_status}
                                        onChange={e => setEditingVet({ ...editingVet, community_status: e.target.value as "Verified" | "Community Sourced" | "Pending" | "Unverified" })}
                                    >
                                        <option value="Verified">Verified</option>
                                        <option value="Community Sourced">Community Sourced</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Unverified">Unverified</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Address</label>
                                <input
                                    type="text"
                                    aria-label="Address"
                                    className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium"
                                    value={editingVet.address || ''}
                                    onChange={e => setEditingVet({ ...editingVet, address: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Website</label>
                                    <input
                                        type="text"
                                        aria-label="Website"
                                        className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium"
                                        value={editingVet.contact?.website || ''}
                                        onChange={e => setEditingVet({
                                            ...editingVet,
                                            contact: { ...editingVet.contact!, website: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Phone</label>
                                    <input
                                        type="text"
                                        aria-label="Phone"
                                        className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium"
                                        value={editingVet.contact?.phone || ''}
                                        onChange={e => setEditingVet({
                                            ...editingVet,
                                            contact: { ...editingVet.contact!, phone: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">English Signals (Comma Separated)</label>
                                <textarea
                                    aria-label="English Signals"
                                    className="w-full p-2 border border-primary/10 rounded-lg text-sm font-medium h-24"
                                    value={(editingVet.verification?.english_signals || []).join(', ')}
                                    onChange={e => setEditingVet({
                                        ...editingVet,
                                        verification: {
                                            ...editingVet.verification!,
                                            english_signals: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-primary/5 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                            <button
                                onClick={() => setEditingVet(null)}
                                className="px-5 py-2.5 rounded-xl font-bold text-sm text-primary/60 hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSaveVet(editingVet)}
                                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-secondary hover:bg-primary/90 transition-colors shadow-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
