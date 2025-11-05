import App from "@/app";
import IndexRoute from "@routes/index.route";
import validateEnv from "@/utils/validateEnv";
import ContactRoute from "./routes/contact.route";

validateEnv();

const app = new App([new IndexRoute(), new ContactRoute()]);

app.listen();
