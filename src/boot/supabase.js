import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "https://adsmsxsesjiyujqjmhvx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkc21zeHNlc2ppeXVqcWptaHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5ODMyODIsImV4cCI6MjAyNTU1OTI4Mn0.Mj0cRnpbXpYtPrIDGSS12vzQ5FMdov1FbuizM5U1gGM";
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const {user} = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase() {
  return { supabase };
}
