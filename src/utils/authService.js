import decode from 'jwt-decode'

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        if (token !== undefined) {
            return token ? true : false;
        }
    }

    getToken() {
        return localStorage.getItem("auth_token");
    }

    login(token) {
        if (token !== undefined) {
            localStorage.setItem("auth_token", token);
            window.location.assign("/dashboard");
        }
    }

    logout() {
        localStorage.removeItem("auth_token");
        window.location.assign("/");
    }

    tokenExpired() {
        const token = this.getToken()

        if (!token) {
            return true
        }

        const { exp } = decode(this.getToken());
        const currentTime = new Date().getTime() / 1000

        return exp < currentTime;
    }
}

export default new AuthService();
