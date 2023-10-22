import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://wtixgxipwrvwgwknuizn.supabase.co"//process.env.REACT_APP_supabaseURL;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0aXhneGlwd3J2d2d3a251aXpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzM4NjUzOSwiZXhwIjoyMDEyOTYyNTM5fQ.naaUpEN9YUrj4zeRyxK031Hu_L0kC0rmDiSNSXQK_So"//process.env.REACT_APP_supabaseKey;

export const supabase = createClient(supabaseURL, supabaseKey)