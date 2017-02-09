/**
 * Created by lisi on 16-10-4.
 */
export class ToolService {

 public transferTime(timeValue: number) {
    let now: Date = new Date();
    let $time = (now.getTime() - timeValue)/1000;
    let $str: string;
    if ($time < 60) {
      $str = '刚刚';
    }
    else if ($time < 60 * 60) {
      let $min = Math.floor($time / 60);
      $str = $min + '分钟前';
    }
    else if ($time < 60 * 60 * 24) {
      let $h = Math.floor($time / (60 * 60));
      $str = $h + '小时前 ';
    }
    else {
      let $d = Math.floor($time / (60 * 60 * 24));
      if ($d == 1)
        $str = '昨天 ';
      else if ($d == 2)
        $str = '前天 ';
      else
        $str = $d + '天前 ';
    }
    return $str;
  }
}
