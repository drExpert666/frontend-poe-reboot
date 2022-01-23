export class ActionsResult {
  action:Actions;
  obj: any;


  constructor(action: Actions, obj?: any) {
    this.action = action;
    this.obj = obj;
  }
}

export enum Actions {
  ADD,
  EDIT,
  CONFIRM,
  CANCEL
}
