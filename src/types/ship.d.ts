type Ship = {
  id: string;
  ownerId: string;
  publicId: string;
  name: string;
  type: string;
  weight: number;
  fuel: number;
  productionYear: string;
  validityPeriod: string;
  isRented: boolean;
  rentPrice: number;
};

type ShipRegister = {
  ownerId: Ship['ownerId'];
  publicId: Ship['publicId'];
  name: Ship['name'];
  type: Ship['type'];
  weight: Ship['weight'];
  fuel: Ship['fuel'];
  productionYear: Ship['productionYear'];
  validityPeriod: Ship['validityPeriod'];
};



export type { Ship, ShipRegister };

