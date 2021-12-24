import { makeAutoObservable, reaction } from "mobx";
import { serverError } from "../models/serverError";

export default class CommonStore
{
    error: serverError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor()
    {
        makeAutoObservable(this);

        // Reacts if something changes:
        reaction(
            () => this.token,// If this parameter changes then execute the following code:
            token => {
                if(token)
                {
                    window.localStorage.setItem('jwt', token);
                }
                else 
                {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: serverError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}