import './index.scss';
import EventUtil from '@/utils/event-util'; // 跨浏览器事件模型
const DRAG_CLASS_NAME='drag'; // 被拖拽元素的类名
let drag=document.getElementById("drag-container");
let dragElement=null;

const dragstartHandler=(e)=>{
    const {target}=e;
    if(target===drag) return;
    target.classList.add(DRAG_CLASS_NAME);
    dragElement=target;
}

EventUtil.addHandler(drag,'dragstart',dragstartHandler);

EventUtil.addHandler(drag,'dragenter',(e)=>{
    const {target}=e;
    if(target===drag) return;
    const position=dragElement.compareDocumentPosition(target); //判断拖拽元素与进入元素的位置关系
    if(position===Node.DOCUMENT_POSITION_PRECEDING){
        drag.insertBefore(dragElement,target);
    }else if(position===Node.DOCUMENT_POSITION_FOLLOWING){
        drag.insertBefore(dragElement,target.nextSibling);
    }
});

EventUtil.addHandler(drag,'dragend',(e)=>{
    const {target}=e;
    if(target===drag) return;
    target.classList.remove(DRAG_CLASS_NAME);
});

