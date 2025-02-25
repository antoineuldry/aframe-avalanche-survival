AFRAME.registerComponent('square-pavage', {
    schema: {
        depth: { type: 'number', default: 10 },
        width: { type: 'number', default: 10 },
        boxSize: { type: 'number', default: 2 },
        gap: { type: 'number', default: 0.1 }
    },
    init: function () {
        console.log('square-pavage initialized');

        for (let x = 0; x < this.data.width; x++) {
            for (let z = 0; z < this.data.depth; z++) {  // Correction ici (axe Z au lieu de Y)
                const box = document.createElement('a-box');
                box.setAttribute('width', this.data.boxSize);
                box.setAttribute('height', 0.2); // Épaisseur du pavage
                box.setAttribute('depth', this.data.boxSize);
                box.setAttribute('color', '#4CC3D9');

                // Placement sur la grille
                const posX = x * (this.data.boxSize + this.data.gap);
                const posZ = z * (this.data.boxSize + this.data.gap);
                box.setAttribute('position', `${posX} 0 ${posZ}`);

                this.el.appendChild(box);
            }
        }
        // setTimeout(() => this.el.setAttribute('tesselation-square', {depth: 20, width: 20}), 5000);
    },
    update: function () {
        console.log('Updated pavage:', this.data);
    },
    tick: function () {

    }
});