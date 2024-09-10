import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { createUser } from './user';

const registerAction = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
) => {
  const userData = await createUserWithEmailAndPassword(auth, email, password);
  if (userData.user && typeof userData.user.email === 'string') {
    await createUser(userData.user.uid, {
      email: userData.user.email,
      profileImage: userData.user.photoURL,
      name: {
        first: firstName ?? userData.user.displayName?.split(' ')[0] ?? null,
        last: lastName ?? userData.user.displayName?.split(' ')[1] ?? null,
      },
    });
  }
  return userData;
};

const loginAction = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const logoutAction = async () => {
  await auth.signOut();
};

export { loginAction, logoutAction, registerAction };
