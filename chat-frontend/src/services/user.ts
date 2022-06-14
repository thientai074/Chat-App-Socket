import { request } from "./request";

export const requestGetAllUsers = async () => {
  return await request.get("/user");
};

export const requestDeleteUser = async (userId: string) => {
  return await request.delete(`/user/${userId}`);
};

// export const requestUpdateUser = async (updateUserForm) => {
//   return await request.put(`/user/${updateUserForm._id}`, updateUserForm);
// };

export const requestGetNotFriends = async () => {
  return await request.get("/notFriend");
};
