import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILanguage } from "../../languages/LanguageTemplate"
import { TLanguage } from "../../models/TLanguage"
import { setLanguage } from "../../utils/language"

interface GlobalState {
    isLoading: boolean
    text: ILanguage
}

const initialState: GlobalState = {
    isLoading: false,
    text: setLanguage(localStorage.getItem('language'))
}

export const GlobalSlice= createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setLanguage(state, action: PayloadAction<TLanguage>) {
            const language = setLanguage(action.payload)
            state.text = language
        }
    },

})

export default GlobalSlice.reducer