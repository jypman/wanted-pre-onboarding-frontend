import { IResTodo } from "../api/todo";

export interface IRenderTodo extends IResTodo {
  isModifyMode: boolean;
  /** 특정 todo의 내용을 임시저장한다.
   * 특정 todo의 내용을 수정하다가 취소를 클릭한 경우 서버 응답했던 todo 값으로 되돌려준다.
   * 만약 todo의 내용을 수정하고 제출을 누르면 tempTodoVal의 값을 서버에 요청한다.
   * */
  tempTodoVal?: string;
}
