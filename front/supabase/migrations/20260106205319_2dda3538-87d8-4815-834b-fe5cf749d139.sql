-- Drop the restrictive policies that were using true (old policies)
DROP POLICY IF EXISTS "Allow public delete access" ON public.students;
DROP POLICY IF EXISTS "Allow public insert access" ON public.students;
DROP POLICY IF EXISTS "Allow public read access" ON public.students;
DROP POLICY IF EXISTS "Allow public update access" ON public.students;