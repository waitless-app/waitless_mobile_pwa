import {
  computed, ref,
} from 'vue';
import { useToast } from 'vue-toastification';

// eslint-disable-next-line import/prefer-default-export
export const useWebsockets = (url, options = {}) => {
  const toast = useToast();

  const defaultOptions = {
    interval: 1000,
    retry: 10,
  };
  const mergedOptions = { ...defaultOptions, ...options };

  const messages = ref([]);
  let ws = null;

  const lastMessage = computed(() => messages.value[messages.value.length - 1]);

  const connect = () => {
    if (ws && ws.readyState === 3) {
      ws = new WebSocket(url);
    }
  };

  ws = new WebSocket(url);

  ws.addEventListener('message', (e) => {
    console.log('Message:', e.data);
    messages.value.push(JSON.parse(e.data));
  });

  ws.addEventListener('error', (err) => {
    toast(`Socket encountered error: ', ${err.message}, 'Closing socket`);
    ws.value.close();
  });

  ws.addEventListener('close', (e) => {
    toast('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(() => {
      connect();
    }, mergedOptions.interval);
  });

  ws.addEventListener('open', () => {
    toast('Connected!');
  });

  const sendMessage = (message) => {
    ws.send(JSON.stringify(message));
  };

  return { sendMessage, lastMessage };
};
