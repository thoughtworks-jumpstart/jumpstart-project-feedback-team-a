import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
process.setMaxListeners(0);
process.on("unhandledRejection", r => console.log(r));
