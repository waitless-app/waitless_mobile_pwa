import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { getItem } from "@/utils/localstorage";

// eslint-disable-next-line import/prefer-default-export
export const useWebsockets = (url, options = {}) => {
  const toast = useToast();

  const wsURL = `${url}?token=${getItem("access_token")}`;

  const defaultOptions = {
    interval: 1000,
    retry: 10,
  };
  const mergedOptions = { ...defaultOptions, ...options };

  const messages = ref([]);
  let ws = null;
  let retries = null;

  const lastMessage = computed(() => messages.value[messages.value.length - 1]);

  const connect = () => {
    const CLOSING_STATE = 2;
    const CLOSED_STATE = 3;
    const isInstanceCreated = !!ws;

    if (isInstanceCreated || [CLOSING_STATE, CLOSED_STATE].includes(ws.readyState)) {
      setTimeout(() => {
        createWebSocketInstance();
      }, mergedOptions.interval);
    }
  };

  const createWebSocketInstance = () => {
    checkRetries(() => {
      ws = new WebSocket(wsURL);
    });
  };

  const checkRetries = (func) => {
    if (!retries || retries > mergedOptions.retry) {
      func.call();
      incrementRetries();
    } else {
      console.info(`Retries reached the limit of ${defaultOptions.retry}`);
    }
  };

  const incrementRetries = () => {
    if (retries) {
      retries += 1;
    } else {
      retries = 1;
    }
  };

  ws = new WebSocket(wsURL);

  ws.addEventListener("message", (e) => {
    messages.value.push(JSON.parse(e.data));
  });

  ws.addEventListener("error", (err) => {
    toast(`Socket encountered error: ', ${err.message}, 'Closing socket`);
    ws.value.close();
    connect();
  });

  ws.addEventListener("close", (e) => {
    toast("Socket is closed. Reconnect will be attempted in 1 second.", e.reason);
    connect();
  });

  ws.addEventListener("open", () => {
    // Log ws opened
  });

  const sendMessage = (message) => {
    ws.send(JSON.stringify(message));
  };

  return { sendMessage, lastMessage };
};
