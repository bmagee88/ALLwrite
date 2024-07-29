import bcrypt from "bcrypt";

export const passwordsMatch = async (
  userGivenPassword: string,
  dbPassword: string
): Promise<boolean> => {
  console.log("frontend password:", userGivenPassword);
  console.log("db password:", dbPassword);
  return await bcrypt.compare(userGivenPassword, dbPassword);
};
