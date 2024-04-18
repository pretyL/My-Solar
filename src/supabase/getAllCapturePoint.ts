import { client } from './client';



async function getAllCapturePoint() {
  const supabase = client();
  const result = await supabase
    .from('capturePoint')
    .select('*');

  return result;
}



export { getAllCapturePoint };

