export interface ITabContent {
  text: string;
  required: boolean;
  currentTab?: boolean;
  completed?: boolean;
}

export interface IDropdownOption {
  text: string;
  value: string | number;
}
