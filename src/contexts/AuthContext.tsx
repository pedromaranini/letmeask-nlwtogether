import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from '../services/firebase';

type User = {
  id : string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  // Evitar que as informações se percam quando der o refresh na página
  // [] vazio = ele executa apenas uma vez, assim que o componente App for mostrado em tela
  useEffect(() => {
    // Monitorando se existia um login já feito pelo usuário
    // Se sim, ele mantém as informações
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid} = user;

        if (!displayName || !photoURL) {
          throw new Error ('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    // Descadastrando do event listener
    // Boa pŕatica -> Toda vez que um event listener for declarado
    // Tem por obrigação se descadastrar dele, no final
    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid} = result.user;

      if (!displayName || !photoURL) {
        throw new Error ('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }


  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}