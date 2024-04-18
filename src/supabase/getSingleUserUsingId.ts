import type { User } from '../types';

import { client } from './client';



async function getSingleUserUsingId(id: User['id']) {
  const supabase = client();
  const result = await supabase
    .from('user')
    .select('*')
    .eq('id', id);
  
  return result;
}



export { getSingleUserUsingId };

