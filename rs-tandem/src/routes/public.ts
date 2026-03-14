import type { ComponentType } from 'react';
import { Home, SecondPage, GroqPage, GroqPage2 } from '../pages';

export interface RouteConfig {
  name: string;
  to: string;
  component: ComponentType;
  index?: boolean;
}

export const routes: RouteConfig[] = [
  { name: 'Главная', to: '/', component: Home, index: true },
  { name: 'Стор', to: '/secpage', component: SecondPage },
  { name: 'Чат', to: '/groq-page', component: GroqPage },
  { name: 'Чат-sdk', to: '/groq-page-2', component: GroqPage2 },
];
