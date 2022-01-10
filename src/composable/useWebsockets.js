import {
  computed, onMounted, ref,
} from 'vue';
import { WS_URL } from '../utils/config';

export const useWebsockets = (url, options = {}) => {
  // const warn = (message) => {
  //   console.warn(`[useWebsockets] - ${message}`);
  // };
  const defaultOptions = {
    interval: 1000,
    retry: 10,
  };
  debugger;

  const mergedOptions = { ...defaultOptions, ...options };

  const messages = ref([]);

  const ws = new WebSocket(WS_URL);

  const readyState = computed(() => ws.value.readyState);

  const lastMessage = computed(() => messages.value[messages.value.length - 1]);

  const connect = () => {
    // if websocket is not active;
    ws.value = new WebSocket(WS_URL);
  };

  onMounted(() => {
    connect();
  });

  ws.onopen = function () {
    // subscribe to some channels
    console.log('On Open');
  };

  ws.onmessage = function (e) {
    console.log('Message:', e.data);
    messages.value.push(JSON.parse(e.data));
  };

  ws.onclose = function (e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(() => {
      connect();
    }, mergedOptions.interval);
  };

  ws.onerror = function (err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.value.close();
  };

  const sendMessage = (message) => {
    ws.value.send(JSON.stringify(message));
  };

  return { sendMessage, readyState, lastMessage };
};

export default useWebsockets();
