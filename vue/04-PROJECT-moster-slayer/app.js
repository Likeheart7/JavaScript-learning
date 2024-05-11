const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      playerName: '',
      winner: null,
      curRound: 0,
      battleLog: [],
    };
  },
  computed: {
    playerBarStyles() {
      let style;
      if (this.playerHealth <= 0) {
        style = { width: '0%' };
        if (this.monsterHealth <= 0) {
          this.winner = 'draw';
        } else {
          this.winner = 'monster';
        }
      } else {
        style = { width: this.playerHealth + '%' };
      }
      if (this.playerHealth < 20) {
        style['backgroundColor'] = 'red';
      }
      return style;
    },
    monsterBarStyles() {
      let style;
      if (this.monsterHealth <= 0) {
        style = { width: '0%' };
        if (this.playerHealth <= 0) {
          this.winner = 'draw';
        } else {
          this.winner = 'player';
        }
      } else {
        style = { width: this.monsterHealth + '%' };
      }
      return style;
    },
  },
  methods: {
    getRandomNumber(min, max) {
      return Math.trunc(Math.random() * (max - min) + min);
    },
    chooseName(event) {
      this.playerName = event.target.value.toUpperCase();
    },
    attackMonster() {
      this.curRound++;
      let damage = this.getRandomNumber(8, 12);
      this.monsterHealth -= damage;
      this.recordLog(this.playerName, 'attack', damage);
      this.attackPlayer();
    },
    specialAttack() {
      this.curRound++;
      const damage = this.getRandomNumber(8, 20);
      this.monsterHealth -= damage;
      this.recordLog(this.playerName, 'special--attack', damage);
      this.attackPlayer();
    },
    attackPlayer() {
      const damage = this.getRandomNumber(10, 15);
      this.playerHealth -= damage;
      this.recordLog('Monster', 'attack', damage);
    },
    heal() {
      this.curRound++;
      const healDose = this.getRandomNumber(9, 20);
      this.playerHealth += healDose;
      this.recordLog(this.playerName, 'heal', healDose);
      this.attackPlayer();
    },
    surrender() {
      this.playerHealth = 0;
      this.winner = 'monster';
    },
    restart() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.curRound = 0;
      this.winner = null;
      this.playerName = '';
      this.battleLog = [];
    },
    recordLog(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount('#game');
