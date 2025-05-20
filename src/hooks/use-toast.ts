
import * as React from "react";
import {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

const TOAST_LIMIT = 10;
const TOAST_REMOVE_DELAY = 10000;

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function generateId() {
  return (++count).toString();
}

export type Toast = Omit<ToasterToast, "id">;

export const reducer = (state: ToasterToast[], action: any) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return [
        ...state,
        { ...action.toast, id: action.id },
      ].slice(-TOAST_LIMIT);

    case actionTypes.UPDATE_TOAST:
      return state.map((t) =>
        t.id === action.id ? { ...t, ...action.toast } : t
      );

    case actionTypes.DISMISS_TOAST:
      return state.map((t) =>
        t.id === action.id ? { ...t, open: false } : t
      );

    case actionTypes.REMOVE_TOAST:
      return state.filter((t) => t.id !== action.id);

    default:
      return state;
  }
};

const listeners: Array<(state: ToasterToast[]) => void> = [];
let memoryState: ToasterToast[] = [];

function dispatch(action: any) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
}

export function toast(options: ToastOptions) {
  const id = options.id || generateId();

  const update = (props: ToastOptions) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      id,
      toast: { ...props },
    });

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...options,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
    id,
  });

  setTimeout(() => {
    dispatch({ type: actionTypes.REMOVE_TOAST, id });
  }, TOAST_REMOVE_DELAY);

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast() {
  const [state, setState] = React.useState<ToasterToast[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts: state,
    toast,
    dismiss: (id: string) => dispatch({ type: actionTypes.DISMISS_TOAST, id }),
  };
}
