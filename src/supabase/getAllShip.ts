import type { Ship } from '../types';

import { client } from './client';



async function getAllShip(ownerId?: Ship['ownerId']) {
  const supabase = client();

  if (ownerId) {
    const result = await supabase
    .from('ship')
    .select('*')
    .eq('ownerId', ownerId);

    return result;
  }

  const result = await supabase
    .from('ship')
    .select('*');

  return result;
}



export { getAllShip };

