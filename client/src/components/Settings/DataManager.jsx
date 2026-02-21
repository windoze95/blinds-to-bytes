import { useState } from 'react';
import { Database, Download, Upload, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../../utils/apiFetch.js';

export default function DataManager() {
  const navigate = useNavigate();
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleExport() {
    setExporting(true);
    setMessage(null);
    try {
      const res = await apiFetch('/api/data/export');
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const date = new Date().toISOString().slice(0, 10);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blinds-to-bytes-backup-${date}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Export downloaded successfully.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to export data.' });
    } finally {
      setExporting(false);
    }
  }

  async function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setMessage(null);
    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const res = await apiFetch('/api/data/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Import failed');
      }

      setMessage({ type: 'success', text: 'Data imported successfully. Reloading...' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to import data.' });
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Database size={24} className="text-workshop-400" />
        <h1 className="text-2xl font-bold text-gray-100">Data Management</h1>
      </div>

      {/* Warning card */}
      <div className="card border-amber-500/20 bg-amber-500/5">
        <div className="flex gap-3 p-1">
          <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-300">Ephemeral Storage Warning</h3>
            <p className="text-xs text-amber-400/70 mt-1 leading-relaxed">
              This app uses SQLite on DigitalOcean App Platform. Storage may be reset on
              redeployment. Export your data regularly to avoid losing progress.
            </p>
          </div>
        </div>
      </div>

      {/* Status message */}
      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Export */}
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold text-gray-200">Export Data</h2>
        <p className="text-sm text-gray-400">
          Download a full backup of your progress, flashcard data, quiz results, and interview
          history as a JSON file.
        </p>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Download size={16} />
          {exporting ? 'Exporting...' : 'Export Data'}
        </button>
      </div>

      {/* Import */}
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold text-gray-200">Import Data</h2>
        <p className="text-sm text-gray-400">
          Restore from a previously exported JSON backup file. This will replace all existing data.
        </p>
        <label className="btn-secondary inline-flex items-center gap-2 text-sm cursor-pointer">
          <Upload size={16} />
          {importing ? 'Importing...' : 'Choose File'}
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            disabled={importing}
            className="hidden"
          />
        </label>
      </div>

      <button
        onClick={() => navigate('/')}
        className="btn-secondary text-sm"
      >
        Back to Study Plan
      </button>
    </div>
  );
}
