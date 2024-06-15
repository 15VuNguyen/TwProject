import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true, //giúp mình dể dàng debug lỗi css hơn
  },
  server: {
    port: 3000, //set client này có port: 3000, nên tý mình set backend của mình port 4000
  },
});
