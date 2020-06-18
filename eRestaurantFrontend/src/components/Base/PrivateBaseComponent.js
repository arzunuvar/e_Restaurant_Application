import { IsNullOrEmpty } from '../../helpers/Checker';
import BaseComponent from './BaseComponent';

class PrivateBaseComponent extends BaseComponent {
    constructor(props) {
        super(props);

        if (IsNullOrEmpty(localStorage.getItem("accessToken"))) {
            
            this.logout(this);
        }

        try {
            this.currentUser = {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        catch (err) {
            this.logout(this);
        }
    }
}

export default PrivateBaseComponent;
