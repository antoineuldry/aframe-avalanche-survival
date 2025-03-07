import { reactive } from 'vue';

export const store = reactive({
    actions: [
        {
            name: 'emitGpsSignal',
            isDone: false,
        },
        {
            name: 'litFire',
            isDone: false,
        },
        {
            name: 'sleep',
            isDone: false,
        },
        {
            name: 'morning',
            isDone: false,
        }
    ],

    performAction(actionName) {
        const action = this.actions.find(action => action.name === actionName);
        action.isDone = true;
    },

    resetActions() {
        this.actions.forEach(action => action.isDone = false);
    },

    getDoneActions() {
        return this.actions.filter(action => action.isDone);
    },

    getIsDone(actionName) {
        return this.actions.find(action => action.name === actionName).isDone;
    }
});