-- 2026-08-02: Seed English values for existing class programs so the bilingual UI can render in English.

UPDATE class_programs
SET
  name_en = 'Penguin',
  age_label_en = '2 - 3 years old',
  category_en = 'Preschool',
  excerpt_en = 'The first stage helps children get used to classroom routines, build basic self-care habits and feel safe at school each day.',
  description_en = 'Penguin is the first class in the preschool journey, focusing on emotional care, daily routines and connections with teachers and friends.'
WHERE slug = 'penguin';

UPDATE class_programs
SET
  name_en = 'Wombat',
  age_label_en = '3 - 4 years old',
  category_en = 'Preschool',
  excerpt_en = 'Children are encouraged to explore through play, movement, music and small-group activities to grow independence and connection.',
  description_en = 'Wombat expands learning through playful experiences and hands-on activities close to daily life.'
WHERE slug = 'wombat';

UPDATE class_programs
SET
  name_en = 'Koala',
  age_label_en = '4 - 5 years old',
  category_en = 'Preschool',
  excerpt_en = 'The program focuses on language growth, logical thinking, collaboration and expressing ideas through small projects.',
  description_en = 'Koala helps children confidently ask questions, share thoughts and join purposeful group activities.'
WHERE slug = 'koala';

UPDATE class_programs
SET
  name_en = 'Kangaroo',
  age_label_en = '5 - 6 years old',
  category_en = 'Pre-primary',
  excerpt_en = 'Children are prepared for primary school through early literacy, thinking skills, self-management and study habits.',
  description_en = 'Kangaroo focuses on school readiness, concentration and initiative in learning tasks.'
WHERE slug = 'kangaroo';

UPDATE class_programs
SET
  name_en = 'Preschool',
  age_label_en = '5 - 6 years old',
  category_en = 'Pre-primary',
  excerpt_en = 'Preschool builds confidence, bilingual communication, independence and adaptability for the next learning stage.',
  description_en = 'Preschool is the final preschool class, helping children build structured learning habits and stronger self-management.'
WHERE slug = 'preschool';
