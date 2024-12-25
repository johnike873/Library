import React from 'react';
import type { Book } from '../types';
import { format } from 'date-fns';
import Card from './ui/Card';
import Button from './ui/Button';

interface BookCardProps {
  book: Book;
  onBorrow?: () => void;
  onReturn?: () => void;
  showActions?: boolean;
}

export default function BookCard({ book, onBorrow, onReturn, showActions = true }: BookCardProps) {
  return (
    <Card className="group">
      <div className="relative">
        <img
          src={book.cover_url}
          alt={book.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {book.title}
        </h3>
        <p className="text-gray-600">{book.author}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
          <p className="text-sm text-gray-500">Category: {book.category}</p>
        </div>
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">{book.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-sm font-medium ${
            book.available_copies > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {book.available_copies} of {book.total_copies} available
          </span>
          {showActions && (
            <div className="space-x-2">
              {book.available_copies > 0 && onBorrow && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onBorrow}
                >
                  Borrow
                </Button>
              )}
              {onReturn && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onReturn}
                >
                  Return
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}