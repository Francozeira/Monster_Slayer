new Vue({
  el: "#app",
  data: {
    onGame: false,
    playerLife: 90,
    monsterLife: 20
  },
  computed: {
    hasWinner() {
      return this.playerLife == 0 || this.monsterLife == 0
		},

  },
  methods: {
		attack(special) {
			this.hurt(10,5, special)
		},

		hurt(max, min, special) {
			const bonus  = special ? 5 : 0
			const hurt = this.randomNo(max + bonus, min + bonus)
			this.monsterLife = Math.max(this.monsterLife - hurt,0)
			console.log(special, hurt, this.monsterLife)
		},
		
		randomNo(max, min) {
			const value = Math.random() * (max - min) + min
			return Math.round(value);
		},
				
		resetGame() {
			this.onGame = false,
			this.playerLife = 100,
			this.monsterLife = 100
		},
	},
  watch: {}
})
