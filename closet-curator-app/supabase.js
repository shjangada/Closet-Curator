// supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bhhiqffdsjjuwnhyrree.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaGlxZmZkc2pqdXduaHlycmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyODI5MjIsImV4cCI6MjA0NDg1ODkyMn0.Ja1VLBFA11WBRO0eey_JKpKJ2jkLb_N2vzbhsOQ1W9I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);