import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title:'title drawer',
    contentComponent: <div> default</div>
}

const ModalHOCReducer = createSlice({
  name: 'ModalHOCReducer',
  initialState,
  reducers: {
    changeContentModalAction:(state,action)=>{
        const {title,contentComponent}=action.payload
        state.title= title;
        state.contentComponent= contentComponent
    }
  }
});

export const {changeContentModalAction} = ModalHOCReducer.actions

export default ModalHOCReducer.reducer