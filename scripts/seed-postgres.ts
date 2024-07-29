import postgres from 'postgres';
import { list as guestList } from './guests-list';

console.log(process.env.POSTGRES_DB_CONNECTION_STRING);

const sqlClient = postgres(process.env.POSTGRES_DB_CONNECTION_STRING || '');

guestList.forEach(async ({ name, pax, status }) => {
  await sqlClient`
    INSERT INTO guests (id, name, status, pax)
    VALUES (
        gen_random_uuid(),
        ${name},
        ${status},
        ${pax}
    )
    ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name,
        status = EXCLUDED.status,
        pax = EXCLUDED.pax;
  `;

  console.log(`Upserted ${name}`);
});
