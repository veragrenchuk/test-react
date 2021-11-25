import { AppStateType } from "../../store/interfaces/store.interface";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;
