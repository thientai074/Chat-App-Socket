export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  email: string;
  password: string;
  avatar: string;
  username: string;
};

export type MessageDataType = {
  conversationId: string;
  sender: string;
  text: string;
  receiver: string;
};

export type WithUserIdFromType = {
  receiverId: string;
};

export type UnReadMessgeType = {
  conversationId: string;
  createdAt: Date;
  read: boolean;
  receiver: string;
  sender: string;
  text: string;
  updatedAt: Date;
};

export type ConversationType = {
  lastMessage: any;
  unreadMessage: any;
  userDetails: any;
  _id: string;
};
