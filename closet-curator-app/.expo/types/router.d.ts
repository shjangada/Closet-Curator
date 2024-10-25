/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/closet` | `/(tabs)/explore` | `/(tabs)/login` | `/(tabs)/welcome` | `/_sitemap` | `/closet` | `/explore` | `/login` | `/welcome`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
