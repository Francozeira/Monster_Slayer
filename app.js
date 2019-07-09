new Vue ({
    el: '#app',
    data: {
        onGame: true,
        playerLife: 100,
        monsterLife: 100,
    },
    computed: {
        hasWinner() {
					return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {

    },
    watch: {}
})