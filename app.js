new Vue({
  el: "#app",
  data: {
    onGame: false,
    playerLife: 100,
		monsterLife: 100,
		logs: [],
  },
  computed: {
    hasWinner() {
      return this.playerLife == 0 || this.monsterLife == 0
		},

  },
  methods: {
		
		startGame() {
			this.onGame = true,
			this.playerLife = 100,
			this.monsterLife = 100
		},
				
		randomNo(max, min) {
			const value = Math.random() * (max - min) + min
			return Math.round(value);
		},
				
		resetGame() {
			this.onGame = false,
			this.playerLife = 100,
			this.monsterLife = 100,
			this.logs = []
		},

		hurt(who, max, min, special, src , trgt , cls) {
			const bonus  = special ? 5 : 0
			const hurt = this.randomNo(max + bonus, min + bonus)
			this[who] = Math.max(this[who] - hurt,0)

				if (special) {
					this.registerlog(`${src} acertou o ${trgt} com uma fireball, dando dano de ${hurt}%`, cls)
					return
				}

				if(src == 'monstrão'){
					this.registerlog(`${src} acertou o ${trgt} de revesgueio, dando dano de ${hurt}%`, cls)
					return
				}

				this.registerlog(`${src} acertou o ${trgt} com uma espadada, dando dano de ${hurt}%`, cls)
		},

		attack(special) {
			this.hurt('monsterLife', 10 , 5 , special , 'jogador' , 'monstrão' , 'player' )
			if (this.monsterLife > 0){
				this.hurt('playerLife', 12 , 7 , false , 'monstrão' , 'jogador' , 'monster' )
			}
		},

		healAndHurt() {
			this.heal( 15 , 10 , 'player' )
			this.hurt('playerLife',12,7, false , 'monstrão' , 'jogador' , 'monster' )
		},

		heal(max, min , cls){
			const value = this.randomNo(max, min)
			this.playerLife = Math.min(this.playerLife + value, 100)
			this.registerlog(`Jogador se curou, aumentando a vida em ${value}%`, cls)
		},

		registerlog(text, cls) {
			this.logs.unshift({text, cls})
		}

	},

  watch: {
		hasWinner(value){
			if (value) {
				this.onGame = false
				this.logs = []
			}
		}
	}

})
