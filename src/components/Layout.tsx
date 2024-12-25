import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Library, LogOut, Book, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import Button from './ui/Button';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Library className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Library System</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/books"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/books')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Book className="h-5 w-5" />
                <span>Books</span>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}