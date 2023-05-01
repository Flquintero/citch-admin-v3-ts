import { Component } from "vue/types/umd";

export interface ITabContent {
  [property: string]:
    | string
    | boolean
    | number
    | Component
    | undefined
    | string[];
  text: string;
  required: boolean;
  currentTab?: boolean;
  completed?: boolean;
  identifier?: number | string;
  requiredFields?: string[];
  component?: Component;
}

export interface IDropdownOption {
  text: string;
  value: string | number;
}

export interface IChooseListOption {
  name: string;
  displayName: string;
  description: string;
  [property: string]: any;
}
