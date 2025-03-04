import { reactive } from 'vue';

export const store = reactive({
    carryItem: null,

    setCarryItem(itemName, details) {
        if (!this.carryItem) {
            this.clearCarryItem();
        }
        this.carryItem = { itemName, details };
        console.log('Carry item:', this.carryItem);

    },

    clearCarryItem() {
        this.carryItem = null;
    },

    getCarryItem() {
        return this.carryItem;
    }
});