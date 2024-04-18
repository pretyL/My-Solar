import type { Ship } from '../types';

import { client } from './client';



async function getSingleShip(id: Ship['id']) {
  const supabase = client();
  const result = await supabase
    .from('ship')
    .select('*')
    .eq('id', id);
  
  return result;
}



export { getSingleShip };

