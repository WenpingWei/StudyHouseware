// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
global.PI = 3.1415926526
console.log('----------12333333333333333333333331111---------')
window.addEventListener('DOMContentLoaded', () => {
  console.log('111111111111111111')
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
