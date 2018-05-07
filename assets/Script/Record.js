cc.Class({
    extends: cc.Component,
    properties: {
      BeginGameStatus: -1,
    },
    onLoad() {
      cc.game.addPersistRootNode(this.node);
      cc.log(">> onloag Record")
    },
    getBeginGameStatus() {
      return this.BeginGameStatus
    },
    setBeginGameStatus(st) {
      this.BeginGameStatus = st
    },
});
