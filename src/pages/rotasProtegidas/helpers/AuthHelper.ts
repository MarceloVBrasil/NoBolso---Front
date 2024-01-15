import jwtDecode from "jwt-decode";

function descriptografarToken(token: string) {
    const payload = jwtDecode(token)
    return payload
}

function verificarToken(token: string) {
    if (!token) return false

    const payload: any = jwtDecode(token)
    return Date.now() > payload.iat
}

export { descriptografarToken, verificarToken }