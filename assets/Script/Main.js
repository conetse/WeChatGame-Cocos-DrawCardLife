import Config from "Config"
import Storage from "Storage"
cc.Class({
    extends: cc.Component,
    properties: {
      overGameDiaglog: {
        default: null,
        type: cc.Node
      },
      simpleHintDiaglog: {
        default: null,
        type: cc.Node
      },
      simpleHintText: {
        default: null,
        type: cc.Label
      },
      commomHintDiaglog: {
        default: null,
        type: cc.Node
      },
      commomHintText: {
        default: null,
        type: cc.Label
      },
      tradePanel: {
        default: null,
        type: cc.Node
      },
      tradeBtn1: {
        default: null,
        type: cc.Node
      },
      tradeBtn2: {
        default: null,
        type: cc.Node
      },
      tradeBtn3: {
        default: null,
        type: cc.Node
      },
      tradeToCardText1: {
        default: null,
        type: cc.Label
      },
      tradeToCardText2: {
        default: null,
        type: cc.Label
      },
      tradeToCardText3: {
        default: null,
        type: cc.Label
      },
      tradeFromCardText1: {
        default: null,
        type: cc.Label
      },
      tradeFromCardText2: {
        default: null,
        type: cc.Label
      },
      tradeFromCardText3: {
        default: null,
        type: cc.Label
      },
      tradeFromCardCountText1: {
        default: null,
        type: cc.Label
      },
      tradeFromCardCountText2: {
        default: null,
        type: cc.Label
      },
      tradeFromCardCountText3: {
        default: null,
        type: cc.Label
      },
      sellBtn1: {
        default: null,
        type: cc.Node
      },
      sellBtn2: {
        default: null,
        type: cc.Node
      },
      sellBtn3: {
        default: null,
        type: cc.Node
      },
      sellBtn4: {
        default: null,
        type: cc.Node
      },
      sellBtn5: {
        default: null,
        type: cc.Node
      },
      sellBtn6: {
        default: null,
        type: cc.Node
      },
      sellCountText1: {
        default: null,
        type: cc.Label
      },
      sellCountText2: {
        default: null,
        type: cc.Label
      },
      sellCountText3: {
        default: null,
        type: cc.Label
      },
      sellCountText4: {
        default: null,
        type: cc.Label
      },
      sellCountText5: {
        default: null,
        type: cc.Label
      },
      sellCountText6: {
        default: null,
        type: cc.Label
      },
      actionPanel: {
        default: null,
        type: cc.Node
      },
      moneyText: {
        default: null,
        type: cc.Label
      },
      dayText: {
        default: null,
        type: cc.Label
      },
      statusText: {
        default: null,
        type: cc.Label
      },
      powerText: {
        default: null,
        type: cc.Label
      },
      waterText: {
        default: null,
        type: cc.Label
      },
      jingshenText: {
        default: null,
        type: cc.Label
      },
      cardlevelcText: {
        default: null,
        type: cc.Label
      },
      cardlevelbText: {
        default: null,
        type: cc.Label
      },
      cardlevelsText: {
        default: null,
        type: cc.Label
      },
      cardlevelrText: {
        default: null,
        type: cc.Label
      },
      cardlevelsrText: {
        default: null,
        type: cc.Label
      },
      cardlevelssrText: {
        default: null,
        type: cc.Label
      },
      kangganranText: {
        default: null,
        type: cc.Label
      },
      zhenjingjiText: {
        default: null,
        type: cc.Label
      },
      vitaminText: {
        default: null,
        type: cc.Label
      },
      kangshengsuText: {
        default: null,
        type: cc.Label
      },
      foodcardText: {
        default: null,
        type: cc.Label
      },
      watercardText: {
        default: null,
        type: cc.Label
      }
    },
    onLoad () {
      this.isStart = false
      this.isOver = false
      this.size = cc.winSize;
      cc.log(">> main", this.size)
      let record = this.getRecord()
      if (record == null) {
        cc.log(">> record comp is null, very sad")
        return
      }
      let bgGameStatus = record.getBeginGameStatus()
      cc.log(">> main bgGameStatus orig", bgGameStatus)
      this.initGameArgs(bgGameStatus)
    },
    start () {
      cc.log(">> main start")
      this.tradePanel.active = false
      this.simpleHintDiaglog.active = false
      this.commomHintDiaglog.active = false
      this.overGameDiaglog.active = false
      this.onStartGame()
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
    initGameArgs(st) {
      cc.log(">> initGameArgs", st)
      if (st == Config.BEGIN_GAME_NEWGAME) {
        this.needRefreshTradeInfo = true
        this.currentTradeInfo = null
        // new game
        this.money = Config.ORIG_MONEY
        this.day = Config.TOTAL_DAY
        this.status = Config.INIT_STATUS
        this.power = Config.INIT_POWER
        this.water = Config.INIT_WATER
        this.jingshen = Config.INIT_JINGSHEN
        this.cardlevelc_count = 0
        this.cardlevelb_count = 0
        this.cardlevels_count = 0
        this.cardlevelr_count = 0
        this.cardlevelsr_count = 0
        this.cardlevelssr_count = 0
        this.card_kangganran_count = 0
        this.card_zhenjingji_count = 0
        this.card_vitamin_count = 0
        this.card_kangshengsu_count = 0
        this.card_food_count = 0
        this.card_water_count = 0
        this.last_scene_index = 0
        this.saveUserCurrentGameData()
      } else {
        this.needRefreshTradeInfo = false
        this.currentTradeInfo = Storage.getTradeInfo()
        // continue game
        let userGameData = Storage.getUserGameData()
        this.money = userGameData.money || 0
        this.day = userGameData.day || 0
        this.status = userGameData.status || 0
        this.power = userGameData.power || 0
        this.water = userGameData.water || 0
        this.jingshen = userGameData.jingshen || 0
        this.cardlevelc_count = userGameData.cardlevelc_count || 0
        this.cardlevelb_count = userGameData.cardlevelb_count || 0
        this.cardlevels_count = userGameData.cardlevels_count || 0
        this.cardlevelr_count = userGameData.cardlevelr_count || 0
        this.cardlevelsr_count = userGameData.cardlevelsr_count || 0
        this.cardlevelssr_count = userGameData.cardlevelssr_count || 0
        this.card_kangganran_count = userGameData.card_kangganran_count || 0
        this.card_zhenjingji_count = userGameData.card_zhenjingji_count || 0
        this.card_vitamin_count = userGameData.card_vitamin_count || 0
        this.card_kangshengsu_count = userGameData.card_kangshengsu_count || 0
        this.card_food_count = userGameData.card_food_count || 0
        this.card_water_count = userGameData.card_water_count || 0
        this.last_scene_index = 0
      }
    },
    saveUserCurrentGameData() {
      if (this.money < 0) this.money = 0
      if (this.day < 0) this.day = 0
      if (this.power < 0) this.power = 0
      if (this.water < 0) this.water = 0
      if (this.jingshen < 0) this.jingshen = 0
      if (this.cardlevelc_count < 0) this.cardlevelc_count = 0
      if (this.cardlevelb_count < 0) this.cardlevelb_count = 0
      if (this.cardlevels_count < 0) this.cardlevels_count = 0
      if (this.cardlevelr_count < 0) this.cardlevelr_count = 0
      if (this.cardlevelsr_count < 0) this.cardlevelsr_count = 0
      if (this.cardlevelssr_count < 0) this.cardlevelssr_count = 0
      if (this.card_kangganran_count < 0) this.card_kangganran_count = 0
      if (this.card_zhenjingji_count < 0) this.card_zhenjingji_count = 0
      if (this.card_vitamin_count < 0) this.card_vitamin_count = 0
      if (this.card_kangshengsu_count < 0) this.card_kangshengsu_count = 0
      if (this.card_food_count < 0) this.card_food_count = 0
      if (this.card_water_count < 0) this.card_water_count = 0
      let userGameData = {
        money: this.money,
        day: this.day,
        power: this.power,
        water: this.water,
        jingshen: this.jingshen,
        cardlevelc_count: this.cardlevelc_count,
        cardlevelb_count: this.cardlevelb_count,
        cardlevels_count: this.cardlevels_count,
        cardlevelr_count: this.cardlevelr_count,
        cardlevelsr_count: this.cardlevelsr_count,
        cardlevelssr_count: this.cardlevelssr_count,
        card_kangganran_count: this.card_kangganran_count,
        card_zhenjingji_count: this.card_zhenjingji_count,
        card_vitamin_count: this.card_vitamin_count,
        card_kangshengsu_count: this.card_kangshengsu_count,
        card_food_count: this.card_food_count,
        card_water_count: this.card_water_count,
      }
      Storage.setUserGameData(userGameData)
    },
    onStartGame() {
      cc.log(">> main onStartGame")
      this.isStart = true
      this.updateUserTopInfoShow()
      this.updateUserPropsInfoShow()
      this.updateCardInfoShow()
    },
    onBackEnter() {
      cc.log(">> main onBackEnter")
      cc.director.loadScene("enter")
    },
    updateUserTopInfoShow() {
      this.moneyText.string = `${this.money}`
      this.dayText.string = `${this.day}`
      this.statusText.string = `正常`
    },
    updateUserPropsInfoShow() {
      this.powerText.string = `${this.power}${Config.RATE_SUFFIX}`
      this.waterText.string = `${this.water}${Config.RATE_SUFFIX}`
      this.jingshenText.string = `${this.jingshen}${Config.RATE_SUFFIX}`
    },
    updateCardInfoShow() {
      this.cardlevelcText.string = `${Config.NUM_PREFIX} ${this.cardlevelc_count}`
      this.cardlevelbText.string = `${Config.NUM_PREFIX} ${this.cardlevelb_count}`
      this.cardlevelsText.string = `${Config.NUM_PREFIX} ${this.cardlevels_count}`
      this.cardlevelrText.string = `${Config.NUM_PREFIX} ${this.cardlevelr_count}`
      this.cardlevelsrText.string = `${Config.NUM_PREFIX} ${this.cardlevelsr_count}`
      this.cardlevelssrText.string = `${Config.NUM_PREFIX} ${this.cardlevelssr_count}`
      this.kangganranText.string = `${Config.NUM_PREFIX} ${this.card_kangganran_count}`
      this.zhenjingjiText.string = `${Config.NUM_PREFIX} ${this.card_zhenjingji_count}`
      this.vitaminText.string = `${Config.NUM_PREFIX} ${this.card_vitamin_count}`
      this.kangshengsuText.string = `${Config.NUM_PREFIX} ${this.card_kangshengsu_count}`
      this.foodcardText.string = `${Config.NUM_PREFIX} ${this.card_food_count}`
      this.watercardText.string = `${Config.NUM_PREFIX} ${this.card_water_count}`
    },
    _draw_card() {
      let n = Math.floor(cc.random0To1() * Config.CARD_TYPE_NUM) % Config.CARD_TYPE_NUM
      let tp = n + 1
      cc.log(">> _draw_card", n, tp)
      switch (tp) {
        case Config.CARD_TYPE_FOOD:
          this.card_food_count++
          this.foodcardText.string = `${Config.NUM_PREFIX} ${this.card_food_count}`
          break
        case Config.CARD_TYPE_WATER:
          this.card_water_count++
          this.watercardText.string = `${Config.NUM_PREFIX} ${this.card_water_count}`
          break
        case Config.CARD_TYPE_VITAMIN:
          this.card_vitamin_count++
          this.vitaminText.string = `${Config.NUM_PREFIX} ${this.card_vitamin_count}`
          break
        case Config.CARD_TYPE_KANGSHENGSU:
          this.card_kangshengsu_count++
          this.kangshengsuText.string = `${Config.NUM_PREFIX} ${this.card_kangshengsu_count}`
          break
        case Config.CARD_TYPE_KANGGANRAN:
          this.card_kangganran_count++
          this.kangganranText.string = `${Config.NUM_PREFIX} ${this.card_kangganran_count}`
          break
        case Config.CARD_TYPE_ZHENJINGJI:
          this.card_zhenjingji_count++
          this.zhenjingjiText.string = `${Config.NUM_PREFIX} ${this.card_zhenjingji_count}`
          break
        case Config.CARD_TYPE_LEVEL_C:
          this.cardlevelc_count++
          this.cardlevelcText.string = `${Config.NUM_PREFIX} ${this.cardlevelc_count}`
          break
        case Config.CARD_TYPE_LEVEL_B:
          this.cardlevelb_count++
          this.cardlevelbText.string = `${Config.NUM_PREFIX} ${this.cardlevelb_count}`
          break
        case Config.CARD_TYPE_LEVEL_S:
          this.cardlevels_count++
          this.cardlevelsText.string = `${Config.NUM_PREFIX} ${this.cardlevels_count}`
          break
        case Config.CARD_TYPE_LEVEL_R:
          this.cardlevelr_count++
          this.cardlevelrText.string = `${Config.NUM_PREFIX} ${this.cardlevelr_count}`
          break
        case Config.CARD_TYPE_LEVEL_SR:
          this.cardlevelsr_count++
          this.cardlevelsrText.string = `${Config.NUM_PREFIX} ${this.cardlevelsr_count}`
          break
        case Config.CARD_TYPE_LEVEL_SSR:
          this.cardlevelssr_count++
          this.cardlevelssrText.string = `${Config.NUM_PREFIX} ${this.cardlevelssr_count}`
          break
      }
      this.saveUserCurrentGameData()
      return tp
    },
    onEatFood() {
      cc.log(">> onEatFood", this.card_food_count)
      if (this.power >= Config.MAX_POWER) return
      if (this.card_food_count>0) {
        this.card_food_count--
        this.foodcardText.string = `${Config.NUM_PREFIX} ${this.card_food_count}`
        this.power += Config.FOOD_CARD_SUPPLY
        if (this.power > Config.MAX_POWER) {
          this.power = Config.MAX_POWER
        }
        this.powerText.string = `${this.power}${Config.RATE_SUFFIX}`
        this.saveUserCurrentGameData()
      }
    },
    onDrinkWater() {
      cc.log(">> onDrinkWater", this.card_water_count)
      if (this.water >= Config.MAX_WATER) return
      if (this.card_water_count>0) {
        this.card_water_count--
        this.watercardText.string = `${Config.NUM_PREFIX} ${this.card_water_count}`
        this.water += Config.WATER_CARD_SUPPLY
        if (this.water > Config.MAX_WATER) {
          this.water = Config.MAX_WATER
        }
        this.waterText.string = `${this.water}${Config.RATE_SUFFIX}`
        this.saveUserCurrentGameData()
      }
    },
    onCoolDown() {
      cc.log(">> onCoolDown", this.card_zhenjingji_count)
      if (this.jingshen >= Config.MAX_JINGSHEN) return
      if (this.card_zhenjingji_count>0) {
        this.card_zhenjingji_count--
        this.zhenjingjiText.string = `${Config.NUM_PREFIX} ${this.card_zhenjingji_count}`
        this.jingshen += Config.JINGSHEN_CARD_SUPPLY
        if (this.jingshen > Config.MAX_JINGSHEN) {
          this.jingshen = Config.MAX_JINGSHEN
        }
        this.jingshenText.string = `${this.jingshen}${Config.RATE_SUFFIX}`
        this.saveUserCurrentGameData()
      }
    },
    onDrawCard() {
      cc.log(">> onDrawCard", this.isStart, this.money)
      if (this.isStart && this.money>=Config.DRAW_MONEY) {
        this.money -= Config.DRAW_MONEY
        this.moneyText.string = `${this.money}`
        let card_type = this._draw_card()
        let card_name = this.getCardNameByType(card_type)
        let hint_text = `${card_name} x1`
        this.showAndAutoCloseSimpleHintDiaglog(hint_text)
        if (this.cardlevelssr_count >= Config.SSR_CARD_WIN_NUM) {
          cc.log(">> con~ you win with SSR card count", this.cardlevelssr_count)
          this.showCommonHintDiaglog("con~ you win")
        }
        this.saveUserCurrentGameData()
      }
    },
    onNextDay() {
      cc.log(">> onNextDay", this.isStart, this.day)
      this.needRefreshTradeInfo = true
      this.renewTradeInfo()
      if (this.isStart && this.day>0 && this.power>0 && this.water>0 && this.jingshen>0) {
        this.day --
        this.dayText.string = `${this.day}`
        this.money += Config.DAY_ADD_MONEY
        this.moneyText.string = `${this.money}`
        this.power -= Config.DAY_POWER_CONSUME
        this.water -= Config.DAY_WATER_CONSUME
        this.jingshen -= Config.DAY_JINGSHEN_CONSUME
      }
      if (this.power<=0) {
        cc.log("you die for power=0")
        this.power = 0
        this.powerText.string = `${this.power}${Config.RATE_SUFFIX}`
        this.saveUserCurrentGameData()
        this.overGame()
        return
      }
      this.powerText.string = `${this.power}${Config.RATE_SUFFIX}`
      if (this.water<=0) {
        cc.log("you die for water=0")
        this.water = 0
        this.waterText.string = `${this.water}${Config.RATE_SUFFIX}`
        this.saveUserCurrentGameData()
        this.overGame()
        return
      }
      this.waterText.string = `${this.water}${Config.RATE_SUFFIX}`
      if (this.jingshen<=0) {
        cc.log("you die for jignshen=0")
        this.jingshen = 0
        this.jingshenText.string = `${this.jingshen}${Config.RATE_SUFFIX}`
        this.saveUserCurrentGameData()
        this.overGame()
        return
      }
      this.jingshenText.string = `${this.jingshen}${Config.RATE_SUFFIX}`
      this.saveUserCurrentGameData()
    },
    updateTradeShow() {
      this.renewTradeInfo()
      // trade info
      let tdInfo1 = this.currentTradeInfo.trade1 || {}
      let toCardName1 = this.getCardNameByType(tdInfo1.toType || -1)
      let fromCardName1 = this.getCardNameByType(tdInfo1.fromType || -1)
      let fromCardExchangeCount1 = tdInfo1.fromCount || 999
      let fromCardCount1 = this.getCardCountByType(tdInfo1.fromType || -1)
      this.tradeToCardText1.string = `${toCardName1}`
      this.tradeFromCardText1.string = `${fromCardName1} x${fromCardExchangeCount1}`
      this.tradeFromCardCountText1.string = `(${fromCardCount1})`
      let tdInfo2 = this.currentTradeInfo.trade2 || {}
      let toCardName2 = this.getCardNameByType(tdInfo2.toType || -1)
      let fromCardName2 = this.getCardNameByType(tdInfo2.fromType || -1)
      let fromCardExchangeCount2 = tdInfo2.fromCount || 999
      let fromCardCount2 = this.getCardCountByType(tdInfo2.fromType || -1)
      this.tradeToCardText2.string = `${toCardName2}`
      this.tradeFromCardText2.string = `${fromCardName2} x${fromCardExchangeCount2}`
      this.tradeFromCardCountText2.string = `(${fromCardCount2})`
      let tdInfo3 = this.currentTradeInfo.trade3 || {}
      let toCardName3 = this.getCardNameByType(tdInfo3.toType || -1)
      let fromCardName3 = this.getCardNameByType(tdInfo3.fromType || -1)
      let fromCardExchangeCount3 = tdInfo3.fromCount || 999
      let fromCardCount3 = this.getCardCountByType(tdInfo3.fromType || -1)
      this.tradeToCardText3.string = `${toCardName3}`
      this.tradeFromCardText3.string = `${fromCardName3} x${fromCardExchangeCount3}`
      this.tradeFromCardCountText3.string = `(${fromCardCount3})`
      // sell info
      this.sellCountText1.string = `(${this.card_food_count})`
      if (this.card_food_count>0) {
        this.sellBtn1.active = true
      } else {
        this.sellBtn1.active = false
      }
      this.sellCountText2.string = `(${this.card_water_count})`
      if (this.card_water_count>0) {
        this.sellBtn2.active = true
      } else {
        this.sellBtn2.active = false
      }
      this.sellCountText3.string = `(${this.card_vitamin_count})`
      if (this.card_vitamin_count>0) {
        this.sellBtn3.active = true
      } else {
        this.sellBtn3.active = false
      }
      this.sellCountText4.string = `(${this.card_kangshengsu_count})`
      if (this.card_kangshengsu_count>0) {
        this.sellBtn4.active = true
      } else {
        this.sellBtn4.active = false
      }
      this.sellCountText5.string = `(${this.card_kangganran_count})`
      if (this.card_kangganran_count>0) {
        this.sellBtn5.active = true
      } else {
        this.sellBtn5.active = false
      }
      this.sellCountText6.string = `(${this.card_zhenjingji_count})`
      if (this.card_zhenjingji_count>0) {
        this.sellBtn6.active = true
      } else {
        this.sellBtn6.active = false
      }
    },
    getCardNameByType(tp) {
      switch (tp) {
        case Config.CARD_TYPE_FOOD:
          return Config.CARD_NAME_FOOD
        case Config.CARD_TYPE_WATER:
          return Config.CARD_NAME_WATER
        case Config.CARD_TYPE_VITAMIN:
          return Config.CARD_NAME_VITAMIN
        case Config.CARD_TYPE_KANGSHENGSU:
          return Config.CARD_NAME_KANGSHENGSU
        case Config.CARD_TYPE_KANGGANRAN:
          return Config.CARD_NAME_KANGGANRAN
        case Config.CARD_TYPE_ZHENJINGJI:
          return Config.CARD_NAME_ZHENJINGJI
        case Config.CARD_TYPE_LEVEL_C:
          return Config.CARD_NAME_LEVEL_C
        case Config.CARD_TYPE_LEVEL_B:
          return Config.CARD_NAME_LEVEL_B
        case Config.CARD_TYPE_LEVEL_S:
          return Config.CARD_NAME_LEVEL_S
        case Config.CARD_TYPE_LEVEL_R:
          return Config.CARD_NAME_LEVEL_R
        case Config.CARD_TYPE_LEVEL_SR:
          return Config.CARD_NAME_LEVEL_SR
        case Config.CARD_TYPE_LEVEL_SSR:
          return Config.CARD_NAME_LEVEL_SSR
        default:
          return Config.CARD_NAME_UNKNOWN
      }
    },
    getCardCountByType(tp) {
      switch (tp) {
        case Config.CARD_TYPE_FOOD:
          return this.card_food_count
        case Config.CARD_TYPE_WATER:
          return this.card_water_count
        case Config.CARD_TYPE_VITAMIN:
          return this.card_vitamin_count
        case Config.CARD_TYPE_KANGSHENGSU:
          return this.card_kangshengsu_count
        case Config.CARD_TYPE_KANGGANRAN:
          return this.card_kangganran_count
        case Config.CARD_TYPE_ZHENJINGJI:
          return this.card_zhenjingji_count
        case Config.CARD_TYPE_LEVEL_C:
          return this.cardlevelc_count
        case Config.CARD_TYPE_LEVEL_B:
          return this.cardlevelb_count
        case Config.CARD_TYPE_LEVEL_S:
          return this.cardlevels_count
        case Config.CARD_TYPE_LEVEL_R:
          return this.cardlevelr_count
        case Config.CARD_TYPE_LEVEL_SR:
          return this.cardlevelsr_count
        case Config.CARD_TYPE_LEVEL_SSR:
          return this.cardlevelssr_count
        default:
          return 0
      }
    },
    setCardCountByType(tp, count) {
      switch (tp) {
        case Config.CARD_TYPE_FOOD:
          this.card_food_count = count
          return
        case Config.CARD_TYPE_WATER:
          this.card_water_count = count
          return
        case Config.CARD_TYPE_VITAMIN:
          this.card_vitamin_count = count
          return
        case Config.CARD_TYPE_KANGSHENGSU:
          this.card_kangshengsu_count = count
          return
        case Config.CARD_NAME_KANGGANRAN:
          this.card_kangganran_count = count
          return
        case Config.CARD_NAME_ZHENJINGJI:
          this.card_zhenjingji_count = count
          return
        case Config.CARD_TYPE_LEVEL_C:
          this.cardlevelc_count = count
          return
        case Config.CARD_TYPE_LEVEL_B:
          this.cardlevelb_count = count
          return
        case Config.CARD_TYPE_LEVEL_S:
          this.cardlevels_count = count
          return
        case Config.CARD_TYPE_LEVEL_R:
          this.cardlevelr_count = count
          return
        case Config.CARD_TYPE_LEVEL_SR:
          this.cardlevelsr_count = count
          return
        case Config.CARD_TYPE_LEVEL_SSR:
          this.cardlevelssr_count = count
          return
        default:
          return
      }
    },
    renewTradeInfo() {
        if (this.needRefreshTradeInfo || !this.currentTradeInfo) {
          this.currentTradeInfo = this.getNewTradeInfo()
          this.needRefreshTradeInfo = false
          Storage.setTradeInfo(this.currentTradeInfo)
        }
    },
    getNewTradeInfo() {
      let tradeInfo = {
        trade1: {
          toType: Config.CARD_TYPE_KANGGANRAN,
          fromType: Config.CARD_TYPE_LEVEL_C,
          fromCount: 13,
        },
        trade2: {
          toType: Config.CARD_TYPE_KANGSHENGSU,
          fromType: Config.CARD_TYPE_LEVEL_S,
          fromCount: 5,
        },
        trade3: {
          toType: Config.CARD_TYPE_FOOD,
          fromType: Config.CARD_TYPE_LEVEL_R,
          fromCount: 7,
        }
      }
      return tradeInfo
    },
    onTradeButton1() {
      cc.log(">> main onTradeButton1")
      this._onTradeButtonByIndex(1)
    },
    onTradeButton2() {
      cc.log(">> main onTradeButton2")
      this._onTradeButtonByIndex(2)
    },
    onTradeButton3() {
      cc.log(">> main onTradeButton3")
      this._onTradeButtonByIndex(3)
    },
    _onTradeButtonByIndex(idx) {
      let tdInfo = null
      if (idx == 1) {
        tdInfo = this.currentTradeInfo.trade1 || {}
      } else if (idx == 2) {
        tdInfo = this.currentTradeInfo.trade2 || {}
      } else {
        tdInfo = this.currentTradeInfo.trade3 || {}
      }
      let toCardName = this.getCardNameByType(tdInfo.toType || -1)
      let toCardCount = this.getCardCountByType(tdInfo.toType || -1)
      let fromCardCount = this.getCardCountByType(tdInfo.fromType || -1)
      let fromCardExchangeCount = tdInfo.fromCount || 999
      cc.log(">> _onTradeButtonByIndex", idx, tdInfo, toCardName, toCardCount, fromCardCount)
      if (fromCardCount>=fromCardExchangeCount) {
        this.setCardCountByType(tdInfo.fromType, fromCardCount-fromCardExchangeCount)
        this.setCardCountByType(tdInfo.toType, toCardCount+1)
        this.updateTradeShow()
        this.updateCardInfoShow()
        this.saveUserCurrentGameData()
      }
    },
    onSellButton1() {
      if (this.card_food_count>0) {
        this.card_food_count--
        this.money += Config.CARD_FOOD_EXCHANGE_MONEY
        this.moneyText.string = `${this.money}`
        this.foodcardText.string = `${Config.NUM_PREFIX} ${this.card_food_count}`
        this.saveUserCurrentGameData()
      }
      this.updateTradeShow()
    },
    onSellButton2() {
      if (this.card_water_count>0) {
        this.card_water_count--
        this.money += Config.CARD_WATER_EXCHANGE_MONEY
        this.moneyText.string = `${this.money}`
        this.watercardText.string = `${Config.NUM_PREFIX} ${this.card_water_count}`
        this.saveUserCurrentGameData()
      }
      this.updateTradeShow()
    },
    onSellButton3() {
      if (this.card_vitamin_count>0) {
        this.card_vitamin_count--
        this.money += Config.CARD_VITAMIN_EXCHANGE_MONEY
        this.moneyText.string = `${this.money}`
        this.vitaminText.string = `${Config.NUM_PREFIX} ${this.card_vitamin_count}`
        this.saveUserCurrentGameData()
      }
      this.updateTradeShow()
    },
    onSellButton4() {
      if (this.card_kangshengsu_count>0) {
        this.card_kangshengsu_count--
        this.money += Config.CARD_KANGSHENGSU_EXCHANGE_MONEY
        this.moneyText.string = `${this.money}`
        this.kangshengsuText.string = `${Config.NUM_PREFIX} ${this.card_kangshengsu_count}`
        this.saveUserCurrentGameData()
      }
      this.updateTradeShow()
    },
    onSellButton5() {
      if (this.card_kangganran_count>0) {
        this.card_kangganran_count--
        this.money += Config.CARD_KANGGANRAN_EXCHANGE_MONEY
        this.moneyText.string = `${this.money}`
        this.kangganranText.string = `${Config.NUM_PREFIX} ${this.card_kangganran_count}`
        this.saveUserCurrentGameData()
      }
      this.updateTradeShow()
    },
    onSellButton6() {
      if (this.card_zhenjingji_count>0) {
        this.card_zhenjingji_count--
        this.money += Config.CARD_ZHENGJINJI_EXCHANGE_MONEY
        this.moneyText.string = `${this.money}`
        this.zhenjingjiText.string = `${Config.NUM_PREFIX} ${this.card_zhenjingji_count}`
        this.saveUserCurrentGameData()
      }
      this.updateTradeShow()
    },
    onTrade() {
      cc.log(">> main onTrade")
      this.updateTradeShow()
      this.tradePanel.active = true
    },
    onCloseTrade() {
      this.tradePanel.active = false
    },
    onMedical() {
      cc.log(">> main onMedical")
      this.showCommonHintDiaglog("你没有疾病")
    },
    onCloseCommonHintDiaglog() {
      this.commomHintDiaglog.active = false
    },
    onFate() {
      cc.log(">> main onFate")
    },
    showCommonHintDiaglog(hint_text) {
      this.commomHintText.string = hint_text
      this.commomHintDiaglog.active = true
    },
    showAndAutoCloseSimpleHintDiaglog(hint_text) {
      this.simpleHintDiaglog.active = true
      this.simpleHintText.string = hint_text
      this.scheduleOnce(() => {
        this.simpleHintDiaglog.active = false
      }, Config.HintShowTs)
    },
    overGame() {
      this.isOver = true
      cc.log(">> main overGame")
      this.overGameDiaglog.active = true
    },
    onCloseOverGame() {
      cc.log(">> main onCloseOverGame")
      this.overGameDiaglog.active = false
      cc.director.loadScene("enter")
    },
    update (dt) {
      // console.log(this.isStart);
      if (this.isOver) return
      if (this.isStart) {
      }
    },
});
