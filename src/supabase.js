import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://wtixgxipwrvwgwknuizn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0aXhneGlwd3J2d2d3a251aXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODY1MzksImV4cCI6MjAxMjk2MjUzOX0.o2C-VMW8adimeAMck3NFlYcsTXNLqs43kxOWJcOfpdI";

export const supabase = createClient(supabaseURL, supabaseKey)