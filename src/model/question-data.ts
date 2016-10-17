/**
 * Created by lisi on 16-10-4.
 */
import { QuestionItemData } from "../model/questionitem-data";

export class QuestionData{
  public id: number;
  public name: string;
  public comment: string;
  public picture: string;
  public rightitem: number;
  public keywordid: number;
  public companyid: number;
  public questionItemList: QuestionItemData[];
  constructor() { }
}
