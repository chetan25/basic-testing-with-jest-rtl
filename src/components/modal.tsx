import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

const CustomModal = ({
    isOpen,
    onClose,
    title,
    body,
    footer,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: React.ReactNode;
    body: React.ReactNode;
    footer?: React.ReactNode;
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{body}</ModalBody>
                {footer ? <ModalFooter>{footer}</ModalFooter> : null}
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
