import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: userData,
    reducers: {
        addUsers: (state, action) => {
            console.log("action", action);
            state.push(action.payload);
        },
        editUser: (state, action) => {
            const { id, name, email } = action.payload;
            const updateUser = state.find((user) => user.id == id);
            if (updateUser) {
                console.log("user found", { ...updateUser });
                updateUser.name = name;
                updateUser.email = email;
            } else {
                console.log("user not found");
            }
        },
        deleteUser: (state, action) => {
            const { id } = action.payload;
            return state.filter((user) => user.id !== id);
        },
    }
});

export const { addUsers, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
