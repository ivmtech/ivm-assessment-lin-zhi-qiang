import React from 'react';
import type { Purchase } from '../api/types';

interface PurchaseHistoryTableProps {
  purchases: Purchase[];
  formatDate: (dateString: string) => string;
}

export default function PurchaseHistoryTable({ purchases, formatDate }: PurchaseHistoryTableProps) {
  if (purchases.length === 0) {
    return (
      <div className="glass-card rounded-3xl shadow-2xl p-16 text-center border-2 border-dashed border-gray-300">
        <div className="text-8xl mb-6">🔎</div>
        <h3 className="text-2xl font-black gradient-text mb-3">No Matching Purchases</h3>
        <p className="text-gray-600 text-lg">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
            <tr>
              {/* [TODO 4]: add table headers for product, amount, time */}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-100">
            {/* [TODO 4]: add table rows for product, amount, time */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
