import Config from "Config"
cc.Class({
    extends: cc.Component,
    properties: {
      startMenu: {
        default: null,
        type: cc.Node
      },
      infoShow: {
        default: null,
        type: cc.Node
      }
  },
  onLoad() {
    cc.log(">> enter onload")
  },
  start() {
    cc.log(">> enter start")
    this.infoShow.active = false
  },
  getRecord() {
    let constNode = cc.find("Record")
    if (constNode == null) {
      cc.log(">> const node is null, very sad")
      return null
    }
    let record = constNode.getComponent("Record")
    return record
  },
  onNewGame() {
    cc.log(">> switch scene to main")
    let record = this.getRecord()
    if (record == null) {
      cc.log(">> record comp is null, very sad")
      return
    }
    let bgGameStatus = record.getBeginGameStatus()
    cc.log(">> enter bgGameStatus orig", bgGameStatus)
    record.setBeginGameStatus(Config.BEGIN_GAME_NEWGAME)
    bgGameStatus = record.getBeginGameStatus()
    cc.log(">> enter bgGameStatus renew", bgGameStatus)
    cc.director.loadScene("main")
  },
  onContinueGame() {
    cc.log(">> switch scene to main")
    let record = this.getRecord()
    if (record == null) {
      cc.log(">> record comp is null, very sad")
      return
    }
    let bgGameStatus = record.getBeginGameStatus()
    cc.log(">> enter bgGameStatus orig", bgGameStatus)
    record.setBeginGameStatus(Config.BEGIN_GAME_CONTINUE)
    bgGameStatus = record.getBeginGameStatus()
    cc.log(">> enter bgGameStatus renew", bgGameStatus)
    cc.director.loadScene("main")
  },
  onStat() {
    cc.log(">> enter onStat")
    cc.director.loadScene("stat")
  },
  onFate() {
    cc.log(">> enter onFate")
  },
  onRank() {
    cc.log(">> enter onRank")
  },
  onInfo() {
    cc.log(">> enter onInfo")
    this.infoShow.active = true
  },
  onCloseInfo() {
    cc.log(">> enter onCloseInfo")
    this.infoShow.active = false
  },
  onZan() {
    cc.log(">> zan the game")
  },
  onVolSetting() {
    cc.log(">> enter onVolSetting")
  },
  onMoreGame() {
    cc.log(">> enter onMoreGame")
  },
})
