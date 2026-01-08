-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'professor');

-- Create user_roles table (NOT on profiles/users table for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user has any admin role (admin or professor)
CREATE OR REPLACE FUNCTION public.is_authenticated_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'professor')
  )
$$;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Drop existing public policies on students table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.students;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.students;
DROP POLICY IF EXISTS "Enable update for all users" ON public.students;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.students;

-- Create secure RLS policies for students table (only authenticated staff)
CREATE POLICY "Staff can view all students"
ON public.students
FOR SELECT
TO authenticated
USING (public.is_authenticated_staff(auth.uid()));

CREATE POLICY "Staff can insert students"
ON public.students
FOR INSERT
TO authenticated
WITH CHECK (public.is_authenticated_staff(auth.uid()));

CREATE POLICY "Staff can update students"
ON public.students
FOR UPDATE
TO authenticated
USING (public.is_authenticated_staff(auth.uid()));

CREATE POLICY "Staff can delete students"
ON public.students
FOR DELETE
TO authenticated
USING (public.is_authenticated_staff(auth.uid()));