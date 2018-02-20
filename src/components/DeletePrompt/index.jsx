import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../ModalWindow';

const DeletePrompt = ({ taskTitle, show, onCloseModal }) => {
    return (
        <div>
            <ModalWindow show={show} onClickOutside={onCloseModal}>
                <div>
                    <span>{`¿Seguro que quieres eliminar "${taskTitle}"?`}</span>
                </div>
            </ModalWindow>
        </div>
    );
};

DeletePrompt.propTypes = {
    taskTitle: PropTypes.string,
    show: PropTypes.bool.isRequired,
};

export default DeletePrompt;