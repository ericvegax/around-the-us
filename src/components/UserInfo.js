import { profileName, profileJob } from "../utils/constants";

export default class UserInfo {
    constructor(nameElement, jobElement) {
        this._userName = nameElement;
        this._userJob = jobElement;
    }

    setUserInfo({ name, job }) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent
        };
    }
}