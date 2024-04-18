import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';



function client() {
  const supabaseUrl: string = 'https://fjevxxxojvwfhiosoyef.supabase.co';
  const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZXZ4eHhvanZ3Zmhpb3NveWVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTQ0NTIxMywiZXhwIjoyMDI3MDIxMjEzfQ.h2wbQ80bKk8XYcvRDYEY3Etsa36DgnKa_L7_NV54o-Y';

  const supabase = createClient(supabaseUrl, supabaseKey);

  return supabase;
}



export { client };

