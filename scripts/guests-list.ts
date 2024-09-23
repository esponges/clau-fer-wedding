export const list: {
  id?: string;
  new_id?: number;
  name: string;
  status: 'pending' | 'rejected' | 'confirmed';
  pax: number;
}[] = [
  {
    pax: 3,
    name: 'Victor Gabriel',
    status: 'pending',
  },
];
