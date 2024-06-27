import React from "react";
import CustomModal from "./modal";
import AddTodo from "./add-todo";

const AddModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return <CustomModal title="" body={<AddTodo onDone={onClose} />} isOpen={isOpen} onClose={onClose} />;
};

export default AddModal;
