interface UserBase {
  username: string;
  email: string;
}

interface DbMetadata {
  id: string;
  createdAt: Date;
  version: number;
}

// combined both worlds
type UserRecord = UserBase & DbMetadata;

function mapToDatabase(user: UserBase): UserRecord & {
  // explicitly declare 'literal' type
  status: "active" | "archived";
} {
  const metadata: DbMetadata = {
    id: "3467-2138-2417",
    createdAt: new Date(),
    version: 1.0,
  };

  return {
    ...user,
    ...metadata,
    status: "active",
  };
}

const user: UserBase = {
  username: "mshandywinata",
  email: "mshandywinata@gmail.com",
};

const result = mapToDatabase(user);
console.log(result);
