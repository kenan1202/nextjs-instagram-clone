import { createContext, useState } from 'react';

export const ModalContext = createContext();


const ModalProvider = (props) => {
    const [opening, setOpening] = useState(false);

    const openModal = () => {
        setOpening(true);
    }

    const closeModal = () => {
        setOpening(false);
    }

    return (
        <ModalContext.Provider value = {{ opening, openModal, closeModal }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider