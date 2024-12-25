import React from 'react';
import type { Borrowing } from '../types';
import { format } from 'date-fns';
import Card from './ui/Card';

interface BorrowingsListProps {
  borrowings: Borrowing[];
}

export default function BorrowingsList({ borrowings }: BorrowingsListProps) {
  return (
    <div className="space-y-4">
      {borrowings.map((borrowing) => (
        <Card key={borrowing.id} className="overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {borrowing.book?.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  by {borrowing.book?.author}
                </p>
              </div>
              <div className="ml-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  borrowing.status === 'active' ? 'bg-green-100 text-green-800' :
                  borrowing.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {borrowing.status.charAt(0).toUpperCase() + borrowing.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Borrowed</p>
                <p className="mt-1 font-medium">
                  {format(new Date(borrowing.borrow_date), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Due Date</p>
                <p className="mt-1 font-medium">
                  {format(new Date(borrowing.due_date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}