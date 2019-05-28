import 'script-loader!easemob-websdk/dist/strophe-1.2.8'
import config from './WebIMConfig'
import websdk from 'easemob-websdk'


let WebIM = window.WebIM || {}

WebIM.config = config

WebIM.conn = new websdk.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    isAutoLogin: WebIM.config.isAutoLogin,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery
})

export default WebIM