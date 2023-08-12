-- AlterTable
CREATE SEQUENCE author_externalid_seq;
ALTER TABLE "Author" ALTER COLUMN "externalId" SET DEFAULT nextval('author_externalid_seq');
ALTER SEQUENCE author_externalid_seq OWNED BY "Author"."externalId";

-- AlterTable
CREATE SEQUENCE book_externalid_seq;
ALTER TABLE "Book" ALTER COLUMN "externalId" SET DEFAULT nextval('book_externalid_seq');
ALTER SEQUENCE book_externalid_seq OWNED BY "Book"."externalId";
