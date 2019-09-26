'use strict';

export class ApiRoutes {

  // static readonly SERVER_URL: string = 'http://localhost:5012/tasty-admin-api/api/';
  static readonly SERVER_URL: string = 'http://localhost:5012/tasty-api/public/';
  // User
  static readonly USER_REGISTER: string = 'registryUser';
  static readonly USER_AUTHORIZE: string = 'auth-user';
  static readonly USER_CURRENT: string = 'getCurrentUser';
  static readonly USER_INFO: string = 'getUser';
 // static readonly LOGOUT: string = 'logout';
 // static readonly IS_USER_AUTHORISE: string = 'is-user-authorise';

  // categories
  static readonly CATEGORIES_LIST: string = 'categories-list';
  static readonly GET_CATEGORY_BY_ID: string = 'get-category-by-id';

  // recipe
  static readonly  RECIPE_ADD: string = 'recipe-add';
  static readonly GET_RECIPES = 'get-recipes';
}// ApiRoutes
