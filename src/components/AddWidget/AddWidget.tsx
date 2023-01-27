import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { toggleModal } from "../../store/Slices/InterfaceSlice";
import styles from "./AddWidget.module.scss";


const AddWidget: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <div
            className={styles.addWidget}
            onClick={() => {
                dispatch(toggleModal())
            }}
        >
            +
        </div>
    );
};

export default AddWidget;
