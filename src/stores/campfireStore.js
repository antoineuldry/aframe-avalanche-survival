import { reactive } from 'vue';

export const store = reactive({
    campfireState: "null",

    updateCampfireState(newState) {
        if (this.campfireState === "null" && newState === "campfireBase") {
            this.campfireState = newState;
            return;
        } else if (this.campfireState === "campfireBase" && newState === "campfirePaper") {
            this.campfireState = newState;
            return;
        } else if (this.campfireState === "campfirePaper" && newState === "campfireLit") {
            this.campfireState = newState;
            return;
        } else if (this.campfireState === "campfireLit" && newState === "campfireOut") {
            this.campfireState = newState;
            return;
        }

        console.error("Invalid campfire state transition from " + this.campfireState + " to " + newState);
    },

    getCampfireState() {
        return this.campfireState;
    }
});