import bcrypt from "bcryptjs";

export async function comparePasswords(
  plainText: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(plainText, hash);
}
