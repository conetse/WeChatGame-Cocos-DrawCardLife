let Storage = {
    getUserGameData:()=>{
        let userGameData = JSON.parse(cc.sys.localStorage.getItem('userGameData') || '{}')
        return userGameData
    },
    setUserGameData:(userGameData)=>{
        cc.sys.localStorage.setItem('userGameData', JSON.stringify(userGameData))
    },
    getTradeInfo:()=>{
        let tradeInfoStr = cc.sys.localStorage.getItem('tradeInfo')
        if (!tradeInfoStr) return null
        let tradeInfo = JSON.parse(cc.sys.localStorage.getItem('tradeInfo'))
        return tradeInfo
    },
    setTradeInfo:(tradeInfo)=>{
        cc.sys.localStorage.setItem('tradeInfo', JSON.stringify(tradeInfo))
    },
    getHighScore:()=>{
        let score = cc.sys.localStorage.getItem('HighScore') || 0
        return parseInt(score);
    },
    setHighScore:(score)=>{
        cc.sys.localStorage.setItem('HighScore', score);
    },
}

export default Storage
