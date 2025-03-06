import { reactive } from 'vue';

export const store = reactive({
    logs: [],

    addLog(pos) {
        this.logs.push(pos);
    },

    getLogs() {
        return this.logs;
    }
});