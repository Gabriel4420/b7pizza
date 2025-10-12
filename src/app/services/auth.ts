import  prisma  from "@/lib/prisma";
import { CreateUser } from "@/types/user";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
export const hasEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user ? true : false;
};

export const validateUser = async (data: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    return false;
  }
  if (!bcrypt.compareSync(data.password, user.password)) {
    return false;
  }
  return { id: user.id, email: user.email, name: user.name };
};

export const createUser = async (data: CreateUser) => {
  try {
    const user = await prisma.user.create({
      data:{
        name:data.name,
        email:data.email.toLowerCase(),
        password:bcrypt.hashSync(data.password,10),
      },
    });
    return { id: user.id, email: user.email, name: user.name };
  } catch (error) {
    return null;
  }
};

export const createUserToken = async (userId: number) => {
  const token = v4();
  await prisma.user.update({
    where: {
      id: userId.toString(),
    },
    data: {
      token,
    },
  });
  return token;
};
