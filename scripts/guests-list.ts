export const list: {
  id?: string;
  new_id?: number;
  name: string;
  status: 'pending' | 'rejected' | 'confirmed';
  pax: number;
}[] = [
  {
    pax: 2,
    name: 'Andrea y Beto',
    status: 'pending',
  },
];
