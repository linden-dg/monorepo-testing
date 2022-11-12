type ISession = {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    groups?: string[];
  };
};
export type CreateContextOptions = {
  session: ISession | null;
};
