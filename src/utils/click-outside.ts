import Vue from "vue";

Vue.directive("custom-click-outside", {
  bind(el: any, binding: any, vnode: any) {
    el.clickOutsideEvent = function (event: Event) {
      if (el !== event.target && !el.contains(event.target)) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("mouseup", el.clickOutsideEvent);
    document.body.addEventListener("touchend", el.clickOutsideEvent);
  },
  unbind: function (el: any) {
    document.body.removeEventListener("mouseup", el.clickOutsideEvent);
    document.body.removeEventListener("touchend", el.clickOutsideEvent);
    delete el.clickOutsideEvent;
  },
});
