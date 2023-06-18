import Knex from "knex";

const knex = Knex({
    client: 'postgresql',
    connection: {
      // Database connection details
    },
  });
  
  knex.schema.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW."updatedAt" = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  
    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON "YourModel"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);
  
  knex.destroy();