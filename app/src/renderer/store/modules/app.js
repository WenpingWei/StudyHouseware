import { getBit } from '@/util'
const fs = require('fs')
let equip = JSON.parse(fs.readFileSync(__static + '/data/equip.txt').toString())
const state = {
  online: false,
  plc: [7, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  dotAll: {
    working: 0,
    linesStatus: 0,
    alarmSwitch: 0, // 0:全关 1:声光 2:停机 3:全开,
    stranderStatus: 0 // 0: 已停机， 1:工作，3 断线检出停止
  },
  equips: equip,
  // equips: [
  //   { id: '1',
  //     name: '监测单元一',
  //     diameter: 8,
  //     lines: 10,
  //     rlines: 10,
  //     count: 1,
  //     threshold: 1,
  //     status: 0,
  //     d1: 0,
  //     d2: 0
  //   },
  //   { id: 2,
  //     name: '监测单元二',
  //     diameter: 10,
  //     lines: 12,
  //     rlines: 0,
  //     count: 1,
  //     threshold: 0,
  //     status: 0,
  //     d1: 0,
  //     d2: 0
  //   },
  //   { id: 3,
  //     name: '监测单元三',
  //     diameter: 10,
  //     lines: 12,
  //     rlines: 0,
  //     count: 1,
  //     threshold: 0,
  //     status: 0,
  //     d1: 0,
  //     d2: 0
  //   }
  // ],
  times: {
    startTime: null,
    endTime: 0,
    lastRun: 0,
    lastWork: 0,
    runs: 0,
    works: 0
  },
  language: 'zh',
  ckey: false
}
const mutations = {
  setNet: (state, data) => {
    state.online = data
  },
  write: (state, data) => {
    data.forEach(item => {
      state.plc.splice(item[0], 1, item[1])
    })
  },
  setKeys: (state, data) => {
    state.ckey = data
  },
  setUnits: (state, data) => {
    Object.assign(state.units, data)
  },
  setTimes: (state, data) => {
    Object.assign(state.times, data)
  },
  setDots: (state, data) => {
    let eq01 = {...state.equips[0]}
    let eq02 = {...state.equips[1]}
    let eq03 = {...state.equips[2]}
    for (let [index, elem] of data.split('-').entries()) {
      switch (index) {
      // 二进制编码启动单元数选择：7(bin111)3个单元被选 4（bin100)第一个被选 6（bin110）前两个单元被选
        case 0 :
          state.dotAll.linesStatus = elem >> 0
          eq01.status = getBit(elem, 2)
          eq02.status = getBit(elem, 1)
          eq03.status = getBit(elem, 0)
          break
        case 2 :
          eq01.lines = elem
          break
        case 20 :
          eq02.lines = elem
          break
        case 22 :
          eq03.lines = elem
          break
        case 37 :
          eq01.count = elem
          break
        case 38 :
          eq02.count = elem
          break
        case 39 :
          eq03.count = elem
          break
        case 24 :
          state.dotAll.working = elem >> 0
          break
        case 25 :
          state.dotAll.alarmSwitch = elem >> 0
          break
        case 26 :
          eq01.d2 = 0
          eq02.d2 = 0
          eq03.d2 = 0
          if (elem === '1') {
            eq01.d2 = 1
          }
          if (elem === '2') {
            eq02.d2 = 1
          }
          if (elem === '3') {
            eq03.d2 = 1
          }
          if (elem === '4') {
            eq01.d2 = 1
            eq02.d2 = 1
            eq03.d2 = 1
          }
          break
        case 28 :
          eq01.rlines = elem
          eq01.d1 = elem === eq01.lines ? 0 : 1
          break
        case 30 :
          eq02.rlines = elem
          eq02.d1 = elem === eq02.lines ? 0 : 1
          break
        case 32 :
          eq03.rlines = elem
          eq03.d1 = elem === eq03.lines ? 0 : 1
          break
        case 34 :
          state.dotAll.stranderStatus = elem >> 0
          break
      }
    }
    // state.dotAll = data
    // Object.assign(state.dotAll, data)
    state.equips.splice(0, 3, eq01, eq02, eq03)
  },
  setLanguage: (state, language) => {
    state.language = language
    // Cookies.set('language', language)
  },
  setEquip: (state, data) => {
    state.equips.splice(data.i, 1, data.row)
    console.log(state.equips)
    fs.writeFile(__static + '/data/equip.txt', JSON.stringify(state.equips), {flag: 'w+'}, (err, data) => {
      console.log(err, data)
    })
  }
}
const getters = {
  runEquip: state => {
    return state.equips.filter(todo => todo.status)
  },
  canUse: state => {
    return state.equips.some(todo => todo.status)
  }
}
export default {
  state,
  getters,
  mutations
}
