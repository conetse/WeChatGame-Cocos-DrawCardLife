cc.Class({
  extends: cc.Component,
  properties: {
  },
  onLoad() {
    cc.log(">> stat onload")
  },
  start() {
    cc.log(">> stat start")
  },
  onClose() {
    cc.log(">> stat onClose")
    cc.director.loadScene("enter")
  },
})
