import { Database } from "../../database";
import User from "../modules/User";

const database = Database.getInstance();

export const registerUser = (name: string) => {
  const user = database.getOneUser(name);

  if (user) {
    return "Ya existe un usuario con ese nombre";
  }

  const newUser = new User(name);
  database.saveUser(newUser);

  return newUser;
};

export const getUsers = () => {
  const users = database.getUsers;
  const usersFormatted = users.reduce(
    (acc, curr) => acc + `->${curr.getName}\n`,
    ""
  );
  return `Los usuarios registrados son: \n${usersFormatted}`;
};

export const suscribeTopic = (userName: string, topicName: string) => {
  const user = database.getOneUser(userName);
  const topic = database.getOneTopic(topicName);

  if (!user) {
    return "Usuario no encontrado!";
  }

  if (!topic) {
    return "Tema no encontrado!";
  }

  const findTopicExist = user.getSelectedTopics.find(
    (top) => top.getName == topic.getName
  );

  if (findTopicExist) {
    return "El usuario ya se encuentra suscripto a ese tema!";
  }

  //Agrego el topic al usuario correspondiente
  user.suscribeTopic(topic);

  //Actualizo la db
  database.updateUser(user);

  return database.getOneUser(user.getName);
};
