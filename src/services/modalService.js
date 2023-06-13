import { confirmAlert } from "react-confirm-alert";
import Modal from "../shared/components/modal";

class ModalService {
    alert(title, message) {
        confirmAlert({
            title: title,
            message: message,
            customUI: ({ onClose }) => {
                return (
                    <Modal
                        type="alert"
                        title={title}
                        message={message}
                        onClose={onClose}
                    />
                );
            }
        });
    }
    confirm(title, message) {
        return new Promise((resolve, reject) => {
            confirmAlert({
                title: title,
                message: message,
                customUI: ({ onClose }) => {
                    return (
                        <Modal
                            type="confirm"
                            title={title}
                            message={message}
                            onClose={onClose}
                            resolve={resolve}
                            reject={reject}
                        />
                    );
                }
            });
        });
    }
}

export default new ModalService();
