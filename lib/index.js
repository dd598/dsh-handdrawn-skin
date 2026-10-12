// 手绘素描风皮肤 — Host 半部。
//
// 皮肤整体在浏览器侧（client/client.js）。Host 这里只需要是一个合法的、
// 可导入的空插件：client-modules 只为「有活着的 loader entry」的包下发
// 客户端 bundle，所以这个入口本身就是启用开关。
export const name = 'dsh-handdrawn-skin'

export function apply() {}
