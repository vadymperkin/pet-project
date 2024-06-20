import { PageHolder } from "./abstract";
import { WaitCondition } from "../app/page/waitCondition.page";

export class Application extends PageHolder {
    public waitCondition = new WaitCondition(this.page);
}