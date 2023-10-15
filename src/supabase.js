import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_supabaseURL;
const supabaseKey = process.env.REACT_APP_supabaseKey;

export const supabase = createClient(supabaseURL, supabaseKey)