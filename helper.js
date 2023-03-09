import bcrypt from "bcrypt";

import { client } from "./index.js";

export async function getuser(email) {
  return await client
    .db("password")
    .collection("resetpassword")
    .findOne({ email: email });
}
export async function passtokenset(email, randomString) {
  return await client
    .db("password")
    .collection("resetpassword")
    .updateOne({ email: email }, { $set: { pass_token: randomString } });
}
export async function getUserpasstoken(pass_token) {
  return await client
    .db("password")
    .collection("resetpassword")
    .findOne({ pass_token: pass_token });
}
export async function updateuserpassDetails(pass_token, password) {
  return await client
    .db("password")
    .collection("resetpassword")
    .updateOne({ pass_token: pass_token }, { $set: { password: password } });
}
export async function hashingpassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashpassword = await bcrypt.hash(password, salt);
  return hashpassword;
}
