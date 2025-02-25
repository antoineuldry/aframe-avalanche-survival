AFRAME.registerComponent('hexagon-pavage', {
    schema: {
        depth: { type: 'number', default: 10 }, // Nombre de rangées
        width: { type: 'number', default: 10 }, // Nombre de colonnes
        hexSize: { type: 'number', default: 1 }, // Rayon de l'hexagone
        gap: { type: 'number', default: 0.1 } // Espacement
    },
    init: function () {
        console.log('hexagon-pavage initialized');

        const hexWidth = this.data.hexSize * Math.sqrt(3); // Largeur d'un hexagone
        const hexHeight = this.data.hexSize * 2; // Hauteur d'un hexagone
        const hexGap = this.data.gap;

        // Décalage pour centrer le pavage sur (0,0,0)
        const offsetX = -(this.data.width * (hexWidth + hexGap)) / 2;
        const offsetZ = -(this.data.depth * (hexHeight * 0.75 + hexGap)) / 2;

        for (let x = 0; x < this.data.width; x++) {
            for (let z = 0; z < this.data.depth; z++) {
                const hexagon = document.createElement('a-cylinder');
                hexagon.setAttribute('radius', this.data.hexSize);
                hexagon.setAttribute('height', 0.2); // Épaisseur
                hexagon.setAttribute('segments-radial', 6); // Hexagone parfait

                // 🎨 Générer une couleur aléatoire en nuances de gris (tons de pavés)
                const grayTone = Math.floor(Math.random() * 50) + 150; // Valeurs entre 150 et 200
                const color = `rgb(${grayTone},${grayTone},${grayTone})`;
                hexagon.setAttribute('color', color);

                // 📍 Placement sur la grille hexagonale
                let posX = x * (hexWidth + hexGap);
                const posZ = z * (hexHeight * 0.75 + hexGap);

                // Décalage pour les lignes impaires (effet nid d'abeille)
                if (z % 2 === 1) {
                    posX += (hexWidth + hexGap) / 2;
                }

                // Appliquer le décalage global pour centrer le pavage
                hexagon.setAttribute('position', `${posX + offsetX} 0 ${posZ + offsetZ}`);

                this.el.appendChild(hexagon);
            }
        }
    },
    update: function () {
        console.log('Updated pavage:', this.data);
    }
});
