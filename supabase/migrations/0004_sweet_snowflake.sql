/*
  # Fix Books Policy

  Updates the books table policies to allow public read access while maintaining secure write access.

  1. Changes
    - Drop existing books policies
    - Add new policy for public read access
    - Maintain admin/staff-only write access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Books are viewable by everyone" ON books;
DROP POLICY IF EXISTS "Admin and staff can insert books" ON books;
DROP POLICY IF EXISTS "Admin and staff can update books" ON books;

-- Create new policies
CREATE POLICY "Anyone can view books"
  ON books FOR SELECT
  USING (true);

CREATE POLICY "Admin and staff can modify books"
  ON books FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'staff')
    )
  );