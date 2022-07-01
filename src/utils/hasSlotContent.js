import { Comment, Text } from "vue";

// Taken from https://github.com/vuejs/core/issues/4733#issuecomment-1024816095

export function hasSlotContent(slot, slotProps = {}) {
  if (!slot) return false;

  return slot(slotProps).some((vnode) => {
    if (vnode.type === Comment) return false;

    if (Array.isArray(vnode.children) && !vnode.children.length) return false;

    return (
      vnode.type !== Text ||
      (typeof vnode.children === "string" && vnode.children.trim() !== "")
    );
  });
}
