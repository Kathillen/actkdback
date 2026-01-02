-- Add CHECK constraint to restrict belt values
ALTER TABLE public.students
ADD CONSTRAINT valid_belt_level CHECK (
  belt IN (
    'Faixa Branca',
    'Branca ponta Amarela',
    'Amarela',
    'Amarela ponta Verde',
    'Verde',
    'Verde ponta Azul',
    'Azul',
    'Azul ponta Vermelha',
    'Vermelha',
    'Vermelha ponta Preta',
    'Preta'
  )
);

-- Update default value to match valid options
ALTER TABLE public.students
ALTER COLUMN belt SET DEFAULT 'Faixa Branca';