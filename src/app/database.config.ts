import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// console.log(process.env);
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
)

export default supabase;
