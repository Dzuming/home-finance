// @flow

export type State = {
  ui: {
    counter: number,
  },
};

export type Action =
  { type: 'INCREASE' }
  | { type: 'DECREASE' }
  ;

export type Dispatch = (action: Action) => void;

export type AssumptionType = {
    id: string,
    name: string
};

export type Category = {
    id: string,
    name: string
};
