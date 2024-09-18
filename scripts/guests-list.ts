export const list: {
  name: string;
  status: 'pending' | 'rejected' | 'confirmed';
  pax: number;
}[] = [
  {
    pax: 2,
    name: 'JOHN AND JANE',
    status: 'pending',
  },
];
