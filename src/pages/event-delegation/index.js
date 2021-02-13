import EventUtil from '@/utils/event-util'

/**
 * 事件委托
 * 优点
 * 1. 节省设置页面处理事件程序上的时间
 * 2. 减少内存消耗，提升整体性能
 * 3. 给document对象添加事件处理程序时，因为document对象随时可用，所以不用考虑load和DOMContentLoaded事件
 * @type {HTMLElement}
 */
let list = document.getElementById("links");
EventUtil.addHandler(list, 'click', (e) => {
    console.log(e)
    const {target} = e;
    switch (target.id) {
        case "1":
            document.title = "111111"
            break;
        case "2":
            location.href = "http://www.baidu.com";
            break;
        case "3":
            alert('hi');
            break;
    }
})

/**
 * 删除事件处理程序
 */
let btn = document.getElementById("btn");

const handler = () => {
    EventUtil.removeHandler(btn, 'click', handler)
    alert('事件处理程序已删除');
}
EventUtil.addHandler(btn, 'click', handler)




