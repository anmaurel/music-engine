const state = {
    popupStatus: false,
    popupText: "",
};

const getters = {
    getPopupText: (state) => state.popupText,
    getPopupStatus: (state) => state.popupStatus,
};

const mutations = {
    SET_POPUP_NOTIF(state, popup) {
        state.popupText = popup.text;
        state.popupStatus = popup.status;
    },
};

const actions = {
    setPopupNotif({ commit }, { text, status }) {
        commit("SET_POPUP_NOTIF", { text, status });
    },
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export default module;
