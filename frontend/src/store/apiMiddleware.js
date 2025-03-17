// Пример middleware для перехвата API-ориентированных действий
const apiMiddleware = store => next => action => {
    if (action.type && action.type.startsWith('API/')) {
      console.log('API Middleware intercepted action:', action);
    }
    return next(action);
  };
  
  export default apiMiddleware;
  