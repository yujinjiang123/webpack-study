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
    const targetRect = target.getBoundingClientRect();
    if(position===Node.DOCUMENT_POSITION_PRECEDING){
        drag.insertBefore(dragElement,target);
    }else if(position===Node.DOCUMENT_POSITION_FOLLOWING){
        drag.insertBefore(dragElement,target.nextSibling);
    }
    const targetAfter = target.getBoundingClientRect();
    animation(target,targetRect,targetAfter);
});

EventUtil.addHandler(drag,'dragend',(e)=>{
    const {target}=e;
    if(target===drag) return;
    target.classList.remove(DRAG_CLASS_NAME);
});


function animation(target,targetRect,targetAfter){
    target.style.transition='none';
    target.style.transform=`translate3d(${targetRect.left - targetAfter.left}px,${ targetRect.top - targetAfter.top }px,0)`;
    target.offsetWidth; //触发重绘
    target.style.transition='all 300ms';
    target.style.transform='translate3d(0,0,0)';
}



let box=document.getElementById("box");



