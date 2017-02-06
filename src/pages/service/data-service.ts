import {UserData} from "../../model/user-data";
/**
 * Created by lisi on 16-10-4.
 */
export class DataService{
  serverURL:string = 'http://192.168.3.165:8080/lisi/';
  // serverURL:string = 'http://120.76.200.75:8080/lisi/';
  loginUser:UserData;
  isLogin:boolean = false;
  transferResult:string = '111';
}
