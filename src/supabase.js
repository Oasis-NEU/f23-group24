import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://wtixgxipwrvwgwknuizn.supabase.co";
// const supabaseURL = process.env.REACT_APP_supabaseURL;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0aXhneGlwd3J2d2d3a251aXpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzM4NjUzOSwiZXhwIjoyMDEyOTYyNTM5fQ.naaUpEN9YUrj4zeRyxK031Hu_L0kC0rmDiSNSXQK_So";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0aXhneGlwd3J2d2d3a251aXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODY1MzksImV4cCI6MjAxMjk2MjUzOX0.o2C-VMW8adimeAMck3NFlYcsTXNLqs43kxOWJcOfpdI";
// const supabaseKey = process.env.REACT_APP_supabaseKey;


export const supabase = createClient(supabaseURL, supabaseKey);