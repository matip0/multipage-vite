import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dpdcjreodtodlmkpswzg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZGNqcmVvZHRvZGxta3Bzd3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTM2NjcsImV4cCI6MjA2MzIyOTY2N30.QcfK3LEaNubuocLxBEHAdjFtswc-brvLXHfYtFYBsY4'
export const supabase = createClient(supabaseUrl, supabaseKey)
