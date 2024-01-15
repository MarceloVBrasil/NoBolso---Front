import { createContext } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";

const DEFAULT_VALUE = {
    auth: {
        token: '',
        refreshToken: ''
    },
    setAuth: () => { },
}

const AuthContext = createContext<AuthContext>(DEFAULT_VALUE)

export function AuthProvider({ children }: { children: any }) {
    const [auth, setAuth] = useSessionStorage('usuario', DEFAULT_VALUE.auth)

    const authValues = {
        auth,
        setAuth,
    }

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext

interface Tokens {
    token: string
    refreshToken: string
}

interface AuthContext {
    auth: Tokens,
    setAuth: React.Dispatch<React.SetStateAction<Tokens>>
}